import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CommonFunctions } from '../../common/functions';
import { SignUpModel } from '../../controller/auth/model/signUpModel';
import { User } from '../../database/entity/user.entity';
import * as admin from 'firebase-admin';
import { UserProfileModel } from '../../controller/auth/model/userProfileModel';
import { SignInModel } from '../../controller/auth/model/signInModel';
import { VerifyTokenModel } from '../../controller/auth/model/verifyTokenModel';

@Injectable()
export class AuthService {
    constructor(private connection: Connection) { }
    /**
     * Sign in with username & password
     * @param model
     */
    public async signIn(model: SignInModel): Promise<UserProfileModel> {
        let firebaseUser = await admin.auth().getUserByEmail(model.email);
        if (!this.connection.isConnected) {
            await this.connection.connect();
        }
        const databaseUser = await User.findOne({ email: firebaseUser.email });
        const userProfile = CommonFunctions.map(databaseUser) as UserProfileModel;
        firebaseUser = await this.generateToken(firebaseUser);
        userProfile.token = firebaseUser['token'];
        return userProfile;
    }

    /**
     * Sign up user by model from client
     * @param model
     */
    public async signUp(model: SignUpModel): Promise<UserProfileModel> {
        try {
            const firebaseUser = await admin.auth().getUserByEmail(model.email);
            if (firebaseUser) {
                throw new InternalServerErrorException(
                    'User exists on with email: ' + model.email,
                );
            }
        } catch (ex) {
            let firebaseUser = await this.createUserInFirebase(model);
            let databaseUser = await User.findOne({ email: model.email });
            databaseUser = new User();
            databaseUser.email = model.email;
            databaseUser.name = model.name;
            databaseUser.dateOfBirth = model.dateOfBirth;
            if (!this.connection.isConnected) {
                await this.connection.connect();
            }
            const result = await User.insert(databaseUser);
            console.log(result);
            const userProfile = CommonFunctions.map(databaseUser) as UserProfileModel;
            firebaseUser = await this.generateToken(firebaseUser);
            userProfile.token = firebaseUser['token'];
            return userProfile;
        }
    }

    /**
     * Verify token from client
     * @param model
     */
    public async verfiyToken(model: VerifyTokenModel): Promise<boolean> {
        let result = false;
        const firebaseUser = await admin.auth().getUserByEmail(model.email);
        const decodedIdToken: admin.auth.DecodedIdToken = await admin
            .auth()
            .verifyIdToken(model.clientIdToken);
        if (firebaseUser.uid == decodedIdToken.uid) {
            result = true;
        }
        return result;
    }

    /**
     * Create user in firebase
     * @param model
     */
    private async createUserInFirebase(
        model: SignUpModel,
    ): Promise<admin.auth.UserRecord> {
        return await admin.auth().createUser({
            email: model.email,
            emailVerified: false,
            password: CommonFunctions.simpleHash(model.password),
            displayName: model.name,
            disabled: false,
        });
    }

    /**
     * Generate token and return to client
     * @param firebaseUser
     */
    private async generateToken(
        firebaseUser: admin.auth.UserRecord,
    ): Promise<admin.auth.UserRecord> {
        firebaseUser['token'] = await admin
            .auth()
            .createCustomToken(firebaseUser.uid);
        return firebaseUser;
    }
}
