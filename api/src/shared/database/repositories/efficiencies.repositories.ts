import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EfficienciesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.EfficiencyCreateArgs) {
    return this.prismaService.efficiency.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.EfficiencyFindUniqueArgs) {
    return this.prismaService.efficiency.findUnique(findUniqueDto);
  }

  findFirst(findFirstDto: Prisma.EfficiencyFindFirstArgs) {
    return this.prismaService.efficiency.findFirst(findFirstDto);
  }

  delete(deleteDto: Prisma.EfficiencyDeleteArgs) {
    return this.prismaService.efficiency.delete(deleteDto);
  }
}
