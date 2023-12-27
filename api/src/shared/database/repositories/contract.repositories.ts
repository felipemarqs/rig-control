import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContractRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.ContractCreateArgs) {
    return await this.prismaService.contract.create(createDto);
  }

  async findUnique(findUniqueDto: Prisma.ContractFindUniqueArgs) {
    return await this.prismaService.contract.findUnique(findUniqueDto);
  }

  async findFirst(findUniqueDto: Prisma.ContractFindUniqueArgs) {
    return await this.prismaService.contract.findFirst(findUniqueDto);
  }

  async findRigs(findManyDto: Prisma.ContractFindManyArgs) {
    return await this.prismaService.contract.findMany(findManyDto);
  }

  async findAll(findAllDto: Prisma.ContractFindManyArgs) {
    return await this.prismaService.contract.findMany(findAllDto);
  }
}
