import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WellsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.WellCreateArgs) {
    return await this.prismaService.well.create(createDto);
  }

  async createMany(createDto: Prisma.WellCreateManyArgs) {
    return await this.prismaService.well.createMany(createDto);
  }

  async findUnique(findUniqueDto: Prisma.WellFindUniqueArgs) {
    return await this.prismaService.well.findUnique(findUniqueDto);
  }

  async findFirst(findUniqueDto: Prisma.WellFindUniqueArgs) {
    return await this.prismaService.well.findFirst(findUniqueDto);
  }

  async findRigs(findManyDto: Prisma.WellFindManyArgs) {
    return await this.prismaService.well.findMany(findManyDto);
  }

  async findAll(findAllDto: Prisma.WellFindManyArgs) {
    return await this.prismaService.well.findMany(findAllDto);
  }
}
