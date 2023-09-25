import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContractRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.ContractCreateArgs) {
    return await this.prismaService.contract.create(createDto);
  }

  /* async findUnique(findUniqueDto: Prisma.BillingFindUniqueArgs) {
    return await this.prismaService.billing.findUnique(findUniqueDto);
  }

  async findFisrt(findUniqueDto: Prisma.BillingFindFirstArgs) {
    return await this.prismaService.billing.findFirst(findUniqueDto);
  }
*/

  async findAll() {
    return await this.prismaService.contract.findMany();
  }
}
