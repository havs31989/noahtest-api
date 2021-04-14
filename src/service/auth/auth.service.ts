import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CommonFunctions } from '../../common/functions';
import { SignUpModel } from '../../controller/auth/model/signUpModel';
import { User } from '../../database/entity/user.entity';
import * as admin from 'firebase-admin';
import { UserProfileModel } from '../../controller/auth/model/userProfileModel';
import { SignInModel } from '../../controller/auth/model/signInModel';
import { VerifyTokenModel } from '../../controller/auth/model/verifyTokenModel';
import { InternalSignInModel } from '../../controller/auth/model/internalSignInModel';
import { InternalUser } from '../../database/entity/internalUser.entity';
import { Constants } from '../../common/constants';
import { database } from 'firebase-admin';

@Injectable()
export class AuthService {
    constructor(private connection: Connection, private jwtService: JwtService) { }
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
        const userProfile: UserProfileModel = CommonFunctions.map(
            databaseUser,
            new UserProfileModel(),
        );
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
            const userProfile: UserProfileModel = CommonFunctions.map(
                databaseUser,
                new UserProfileModel(),
            );
            firebaseUser = await this.generateToken(firebaseUser);
            userProfile.token = firebaseUser['token'];
            return userProfile;
        }
    }

    /**
     * Internal sign in for internal user only - back office
     * @param model
     */
    public async internalSignIn(
        model: InternalSignInModel,
    ): Promise<UserProfileModel> {
        const password = CommonFunctions.simpleHash(model.password);
        const databaseUser = await InternalUser.findOne({
            email: model.email,
            password: password,
        });
        if (databaseUser) {
            const payload = { username: databaseUser.email, sub: databaseUser.id };
            const token = await this.jwtService.signAsync(payload);
            const refreshToken = this.jwtService.sign(payload, {
                secret: Constants.jwtSecret,
            });
            databaseUser.token = token;
            databaseUser.tokenExp = this.jwtService.decode(token)['exp'];
            databaseUser.refreshToken = refreshToken;
            InternalUser.save(databaseUser);
            const userProfile: UserProfileModel = CommonFunctions.map(
                databaseUser,
                new UserProfileModel(),
            );
            return userProfile;
        } else {
            throw new NotFoundException(
                'Cannot find user with email: ' + model.email,
            );
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
     * Verify internal token
     * @param token
     */
    public verifyInternalToken(token: string): boolean {
        let result = false;
        try {
            const tokenVerify = this.jwtService.verify(token);
            if (tokenVerify) {
                result = true;
            }
        } catch (ex) {
            throw new InternalServerErrorException(ex.message);
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
