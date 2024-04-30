import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserLogsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.UserLogCreateArgs) {
    return await this.prismaService.userLog.create(createDto);
  }

  async findUnique(findUniqueDto: Prisma.UserLogFindUniqueArgs) {
    return await this.prismaService.userLog.findUnique(findUniqueDto);
  }

  async findFirst(findUniqueDto: Prisma.UserLogFindUniqueArgs) {
    return await this.prismaService.userLog.findFirst(findUniqueDto);
  }

  async findMany(findManyDto: Prisma.UserLogFindManyArgs) {
    return await this.prismaService.userLog.findMany(findManyDto);
  }
}
