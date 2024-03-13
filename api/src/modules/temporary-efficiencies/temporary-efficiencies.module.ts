import { Module } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { TemporaryEfficiencyController } from './temporary-efficiencies.controller';
import { TemporaryEfficiencyService } from './temporary-efficiencies.service';

@Module({
  controllers: [TemporaryEfficiencyController],
  providers: [TemporaryEfficiencyService, PrismaClient],
})
export class TemporaryEfficienciesModule {}
