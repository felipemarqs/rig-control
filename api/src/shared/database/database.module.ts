import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { UsersRigRepository } from './repositories/usersRig.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, UsersRigRepository],
  exports: [UsersRepository, UsersRigRepository],
})
export class DatabaseModule {}
