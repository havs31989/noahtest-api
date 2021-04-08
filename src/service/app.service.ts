import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import configuration from '../../config/configuration';

@Injectable()
export class AppService {
    constructor(private connection: Connection) { }

    async getAppInfo(): Promise<string> {
        const appInfo = {};
        if (!this.connection.isConnected) {
            await this.connection.connect();
        }
        appInfo['version'] = configuration().version;
        appInfo['port'] = configuration().port;
        appInfo['dbStatus'] = this.connection.isConnected;
        await this.connection.close();
        return JSON.stringify(appInfo);
    }
}
