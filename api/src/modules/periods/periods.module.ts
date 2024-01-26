import { Module } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodsController } from './periods.controller';

@Module({
  controllers: [PeriodsController],
  providers: [PeriodsService],
})
export class PeriodsModule {}
