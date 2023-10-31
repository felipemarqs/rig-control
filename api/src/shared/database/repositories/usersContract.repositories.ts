import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersContractRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.UserContractCreateArgs) {
    return await this.prismaService.userContract.create(createDto);
  }

  async findFirst(findFirstDto: Prisma.UserContractFindFirstArgs) {
    return await this.prismaService.userContract.findFirst(findFirstDto);
  }

  async createMany(createManyDto: Prisma.UserContractCreateManyArgs) {
    return await this.prismaService.userContract.createMany(createManyDto);
  }
}
