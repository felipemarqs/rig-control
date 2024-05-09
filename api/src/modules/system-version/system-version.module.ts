import { Module } from '@nestjs/common';
import { SystemVersionService } from './system-version.service';
import { SystemVersionController } from './system-version.controller';

@Module({
  controllers: [SystemVersionController],
  providers: [SystemVersionService],
})
export class SystemVersionModule {}
