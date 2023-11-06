import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DeletionRequestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.DeletionRequestCreateArgs) {
    return await this.prismaService.deletionRequest.create(createDto);
  }

  async findFisrt(findUniqueDto: Prisma.DeletionRequestFindFirstArgs) {
    return await this.prismaService.deletionRequest.findFirst(findUniqueDto);
  }

  async findMany(findMany: Prisma.DeletionRequestFindManyArgs) {
    return await this.prismaService.deletionRequest.findMany(findMany);
  }

  async update(updateDeletionRequestDto: Prisma.DeletionRequestUpdateArgs) {
    return await this.prismaService.deletionRequest.update(
      updateDeletionRequestDto,
    );
  }

  /*  async findUnique(findUniqueDto: Prisma.BillingFindUniqueArgs) {
    return await this.prismaService.billing.findUnique(findUniqueDto);
  }

  

  async findAll() {
    return await this.prismaService.billing.findMany();
  } */
}
