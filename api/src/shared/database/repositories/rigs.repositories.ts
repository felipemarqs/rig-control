import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RigsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.RigCreateArgs) {
    return await this.prismaService.rig.create(createDto);
  }

  async findUnique(findUniqueDto: Prisma.RigFindUniqueArgs) {
    return await this.prismaService.rig.findUnique(findUniqueDto);
  }
}
