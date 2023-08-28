import { Module } from '@nestjs/common';
import { RigsService } from './rigs.service';
import { RigsController } from './rigs.controller';

@Module({
  controllers: [RigsController],
  providers: [RigsService],
})
export class RigsModule {}
