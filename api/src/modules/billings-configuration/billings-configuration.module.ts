import { Module } from '@nestjs/common';
import { BillingsConfigurationService } from './billings-configuration.service';
import { BillingsConfigurationController } from './billings-configuration.controller';

@Module({
  controllers: [BillingsConfigurationController],
  providers: [BillingsConfigurationService],
})
export class BillingsConfigurationModule {}
