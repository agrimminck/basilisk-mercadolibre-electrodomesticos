import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class AppController {
  @Get()
  GetHealth(): { status: string } {
    return { status: 'ok' };
  }
}
