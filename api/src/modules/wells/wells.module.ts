import { Module } from '@nestjs/common';
import { WellsService } from './wells.service';
import { WellsController } from './wells.controller';

@Module({
  controllers: [WellsController],
  providers: [WellsService],
})
export class WellsModule {}
