import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SystemVersionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findFirst(findFirstDto: Prisma.SystemVersionFindFirstArgs) {
    return await this.prismaService.systemVersion.findFirst(findFirstDto);
  }
}
