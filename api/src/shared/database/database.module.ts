import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { UsersRigRepository } from './repositories/usersRig.repositories';
import { RigsRepository } from './repositories/rigs.repositories';
import { EfficienciesRepository } from './repositories/efficiencies.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    UsersRigRepository,
    RigsRepository,
    EfficienciesRepository,
  ],
  exports: [
    UsersRepository,
    UsersRigRepository,
    RigsRepository,
    EfficienciesRepository,
  ],
})
export class DatabaseModule {}
