import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class EfficienciesRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly prisma: PrismaClient,
  ) {}

  async create(createDto: Prisma.EfficiencyCreateArgs) {
    return await this.prismaService.efficiency.create(createDto);
  }

  async findMany(findAllDto: Prisma.EfficiencyFindManyArgs) {
    return await this.prismaService.efficiency.findMany(findAllDto);
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

  async getAverage(rigId: string) {
    const efficiencyAverageByRig = await this.prisma.$queryRaw`
    SELECT
      e.rig_id AS rigId,
      r.name AS rigName,
      AVG(e.available_Hours) AS averageAvailableHours,
      AVG(e.dtm_hours) AS averageDtmHours
    FROM
      efficiencies e
    JOIN
      rigs r ON e.rig_id = r.id 
    GROUP BY
      e.rig_id, r.name;
  `;

    console.log(efficiencyAverageByRig);

    const ano = 2023;
    return await this.prisma.$queryRaw`
    SELECT
      TO_CHAR(date, 'YYYY-MM') AS month,
      AVG(available_hours) AS avg
    FROM efficiencies
    WHERE rig_id = ${rigId}::UUID
      AND EXTRACT(YEAR FROM date) = ${ano}
    GROUP BY month
    ORDER BY month;
  `;
  }
}
