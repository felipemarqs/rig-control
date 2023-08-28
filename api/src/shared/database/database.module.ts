import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { UsersRigRepository } from './repositories/usersRig.repositories';
import { RigsRepository } from './repositories/rigs.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    UsersRigRepository,
    RigsRepository,
  ],
  exports: [UsersRepository, UsersRigRepository, RigsRepository],
})
export class DatabaseModule {}
