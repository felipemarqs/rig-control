import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRigRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.UserRigCreateArgs) {
    return await this.prismaService.userRig.create(createDto);
  }

  async findFirst(findFirstDto: Prisma.UserRigFindFirstArgs) {
    return await this.prismaService.userRig.findFirst(findFirstDto);
  }
}
