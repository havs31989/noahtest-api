import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import configuration from '../../config/configuration';
import * as admin from 'firebase-admin';

@Injectable()
export class AppService {
  constructor(private connection: Connection) {}

  /**
   * Get app status
   * */
  public async getAppInfo(): Promise<string> {
    const appInfo = {};
    if (!this.connection.isConnected) {
      await this.connection.connect();
    }
    appInfo['version'] = configuration().version;
    appInfo['port'] = configuration().port;
    appInfo['dbStatus'] = this.connection.isConnected;
    await this.connection.close();
    appInfo['googleAdminStatus'] = admin.app.length !== 0 ? true : false;
    return JSON.stringify(appInfo);
  }
}
