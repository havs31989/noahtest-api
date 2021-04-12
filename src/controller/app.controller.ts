import { Controller, Get } from '@nestjs/common';
import { Route } from '../../config/route';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(Route.appInfo)
  public async getAppInfo(): Promise<string> {
    return await this.appService.getAppInfo();
  }
}
