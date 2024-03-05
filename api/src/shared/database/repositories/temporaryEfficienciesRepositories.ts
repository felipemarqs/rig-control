import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TemporaryEfficienciesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.TemporaryEfficiencyCreateArgs) {
    return await this.prismaService.temporaryEfficiency.create(createDto);
  }

  async delete(deleteDto: Prisma.TemporaryEfficiencyDeleteArgs) {
    return await this.prismaService.temporaryEfficiency.delete(deleteDto);
  }

  async findFirst(findFirstDto: Prisma.TemporaryEfficiencyFindFirstArgs) {
    return await this.prismaService.temporaryEfficiency.findFirst(findFirstDto);
  }

  async findUnique(findUniqueDto: Prisma.TemporaryEfficiencyFindUniqueArgs) {
    return await this.prismaService.temporaryEfficiency.findFirst(
      findUniqueDto,
    );
  }
}
