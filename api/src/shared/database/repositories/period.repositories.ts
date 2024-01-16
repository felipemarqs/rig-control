import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PeriodsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.PeriodCreateArgs) {
    return await this.prismaService.period.create(createDto);
  }

  async findMany(findManyDto: Prisma.PeriodFindManyArgs) {
    return await this.prismaService.period.findMany(findManyDto);
  }

  async update(
    updateBillingsConfigurationDto: Prisma.BillingConfigurationUpdateArgs,
  ) {
    return await this.prismaService.billingConfiguration.update(
      updateBillingsConfigurationDto,
    );
  }
}
