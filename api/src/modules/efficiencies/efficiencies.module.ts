import { Module } from '@nestjs/common';
import { EfficienciesService } from './efficiencies.service';
import { EfficienciesController } from './efficiencies.controller';

@Module({
  controllers: [EfficienciesController],
  providers: [EfficienciesService],
})
export class EfficienciesModule {}
