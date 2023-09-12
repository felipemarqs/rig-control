import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BillingConfigurationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.BillingConfigurationCreateArgs) {
    return await this.prismaService.billingConfiguration.create(createDto);
  }

  async findUnique(findUniqueDto: Prisma.BillingConfigurationFindUniqueArgs) {
    return await this.prismaService.billingConfiguration.findUnique(
      findUniqueDto,
    );
  }

  async findFisrt(findUniqueDto: Prisma.BillingConfigurationFindFirstArgs) {
    return await this.prismaService.billingConfiguration.findFirst(
      findUniqueDto,
    );
  }

  async findAll(findManyDto: Prisma.BillingConfigurationFindManyArgs) {
    return await this.prismaService.billingConfiguration.findMany(findManyDto);
  }

  async update(
    updateBillingsConfigurationDto: Prisma.BillingConfigurationUpdateArgs,
  ) {
    return await this.prismaService.billingConfiguration.update(
      updateBillingsConfigurationDto,
    );
  }
}
