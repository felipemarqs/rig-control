import { Module } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { BillingsController } from './billings.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [BillingsController],
  providers: [BillingsService, PrismaClient],
})
export class BillingsModule {}
