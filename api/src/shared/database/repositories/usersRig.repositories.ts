import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRigRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.UserRigCreateArgs) {
    return this.prismaService.userRig.create(createDto);
  }
}
