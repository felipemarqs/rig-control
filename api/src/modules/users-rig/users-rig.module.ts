import { Module } from '@nestjs/common';
import { UsersRigService } from './users-rig.service';
import { UsersRigController } from './users-rig.controller';

@Module({
  controllers: [UsersRigController],
  providers: [UsersRigService],
})
export class UsersRigModule {}
