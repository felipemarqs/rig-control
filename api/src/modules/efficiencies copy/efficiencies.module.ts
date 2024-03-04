import { Module } from '@nestjs/common';
import { EfficienciesService } from './efficiencies.service';
import { EfficienciesController } from './efficiencies.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [EfficienciesController],
  providers: [EfficienciesService, PrismaClient],
})
export class EfficienciesModule {}
