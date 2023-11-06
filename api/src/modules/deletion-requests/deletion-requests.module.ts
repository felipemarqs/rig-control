import { Module } from '@nestjs/common';
import { DeletionRequestsService } from './deletion-requests.service';
import { DeletionRequestsController } from './deletion-requests.controller';

@Module({
  controllers: [DeletionRequestsController],
  providers: [DeletionRequestsService],
})
export class DeletionRequestsModule {}
