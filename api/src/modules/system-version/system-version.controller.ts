import { Controller, Get } from '@nestjs/common';
import { SystemVersionService } from './system-version.service';

@Controller('system-version')
export class SystemVersionController {
  constructor(private readonly systemVersionService: SystemVersionService) {}
  @Get('/latest')
  findFirst() {
    return this.systemVersionService.findFirst();
  }
}
