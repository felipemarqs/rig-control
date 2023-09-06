import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { isValid, parse } from 'date-fns';
import { BillingRepository } from 'src/shared/database/repositories/billing.repositories';

@Injectable()
export class BillingsService {
  constructor(
    private readonly billingRepo: BillingRepository,
    private readonly prisma: PrismaClient,
  ) {}

  async findByEfficiencyId(efficiencyId: string) {
    return await this.billingRepo.findFisrt({
      where: { efficiencyId },
    });
  }

  async findAll({ startDate, endDate }) {
    // const prisma = new PrismaClient();

    /*     const formattedStartDate = parse(startDate, 'yyyy-MM-dd', new Date());
    const formattedEndDate = parse(endDate, 'yyyy-MM-dd', new Date()); */

    /* if (!isValid(formattedStartDate) || !isValid(formattedEndDate)) {
      throw new BadRequestException('Datas fornecidas são inválidas');

      
    } */

    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);

    const billings = await this.prisma.$queryRaw`
      SELECT
      b.rig_id AS rigId,
      r.name AS rigName, 
      SUM(b.available_hour_amount) AS availableHourAmount,
      SUM(b.gloss_hour_amount) AS glossHourAmount,
      SUM(b.dtm_lt_20_amount) AS dtmLt20Amount,
      SUM(b.dtm_bt_20_and_50_amount) AS dtmBt20And50Amount,
      SUM(b.dtm_gt_50_amount) AS dtmGt50Amount,
      SUM(b.fluid_lt_20_amount) AS fluidLt20Amount,
      SUM(b.fluid_bt_20_and_50_amount) AS fluidBt20And50Amount,
      SUM(b.fluid_gt_50_amount) AS fluidGt50Amount,
      SUM(b.equipment_lt_20_amount) AS equipmentLt20Amount,
      SUM(b.equipment_bt_20_and_50_amount) AS equipmentBt20And50Amount,
      SUM(b.equipment_gt_50_amount) AS equipmentGt50Amount,
      SUM(total) AS total
    FROM
      billings b
    JOIN
      rigs r ON b.rig_id = r.id 
    WHERE
      b.date >= ${formattedStartDate}
      AND b.date <= ${formattedEndDate}
    GROUP BY
      b.rig_id, r.name;  
  `;

    //await prisma.$disconnect();
    return billings;
  }
}
