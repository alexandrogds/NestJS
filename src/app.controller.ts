import { Controller, Get, Next, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Next() _, @Res({ passthrough: true }) res, @Req() req): string {
    return this.appService.getHello();
  }
}
