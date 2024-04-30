import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class BillingRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly prisma: PrismaClient,
  ) {}

  async create(createDto: Prisma.BillingCreateArgs) {
    return await this.prismaService.billing.create(createDto);
  }

  async findUnique(findUniqueDto: Prisma.BillingFindUniqueArgs) {
    return await this.prismaService.billing.findUnique(findUniqueDto);
  }

  async findMany(findManyDto: Prisma.BillingFindManyArgs) {
    return await this.prismaService.billing.findMany(findManyDto);
  }

  async findFisrt(findUniqueDto: Prisma.BillingFindFirstArgs) {
    return await this.prismaService.billing.findFirst(findUniqueDto);
  }

  async update(updateDto: Prisma.BillingUpdateArgs) {
    return await this.prismaService.billing.update(updateDto);
  }

  async findAll({ startDate, endDate }) {
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);

    const billings = await this.prisma.$queryRaw`
      SELECT
      b.rig_id AS rigId,
      r.name AS rigName,
      SUM(b.available_hour_amount) AS availableHourAmount,
      SUM(b.gloss_hour_amount) AS glossHourAmount,
      SUM(b.repair_hour_amount) AS repairHourAmount,
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

    return billings;
  }

  async findByRigId({
    rigId,
    startDate,
    endDate,
  }: {
    rigId: string;
    startDate: string;
    endDate: string;
  }) {
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);
    const billings = await this.prisma.$queryRaw`
    SELECT
    b.rig_id AS rigId,
    r.name AS rigName, 
    SUM(b.available_hour_amount) AS availableHourAmount,
    SUM(b.gloss_hour_amount) AS glossHourAmount,
    SUM(b.repair_hour_amount) AS repairHourAmount,
    SUM(b.dtm_hour_amount) AS dtmHourAmount,
    SUM(b.dtm_lt_20_amount) AS dtmLt20Amount,
    SUM(b.dtm_bt_20_and_50_amount) AS dtmBt20And50Amount,
    SUM(b.dtm_gt_50_amount) AS dtmGt50Amount,
    SUM(b.fluid_lt_20_amount) AS fluidLt20Amount,
    SUM(b.fluid_bt_20_and_50_amount) AS fluidBt20And50Amount,
    SUM(b.fluid_gt_50_amount) AS fluidGt50Amount,
    SUM(b.equipment_lt_20_amount) AS equipmentLt20Amount,
    SUM(b.equipment_bt_20_and_50_amount) AS equipmentBt20And50Amount,
    SUM(b.equipment_gt_50_amount) AS equipmentGt50Amount,
    SUM(b.mobilization_amount) AS mobilizationAmount,
    SUM(b.demobilization_amount) AS demobilizationAmount,
    SUM(b.extra_trailer_amount) AS extraTrailerAmount,
    SUM(b.power_swivel_amount) AS powerSwivelAmount,
    SUM(b.truck_cart_rent_amount) AS truckCartRentAmount,
    SUM(b.transportation_amount) AS transportationAmount,
    SUM(b.truck_km_amount) AS truckKmAmount,
    SUM(b.bob_rent_amount) AS bobRentAmount,
    SUM(b.mix_tank_month_rent_amount) AS mixTankMonthRentAmount,
    SUM(b.mix_tank_hour_rent_amount) AS mixTankHourRentAmount,
    SUM(b.generator_fuel_amount) AS generatorFuelAmount,
    SUM(b.mix_tank_operator_amount) AS mixTankOperatorAmount,
    SUM(b.mix_tank_dtm_amount) AS mixTankDtmAmount,
    SUM(b.mix_tank_mobilization_amount) AS mixTankMobilizationAmount,
    SUM(b.mix_tank_demobilization_amount) AS mixTankDemobilizationAmount,
    SUM(b.sucking_truck_amount) AS suckingTruckAmount,
    SUM(b."truck_TankAmount") AS truckTankAmount,
    SUM(b.christmas_tree_disassembly_amount) AS christmasTreeDisassemblyAmount,
    SUM(b.munck_amount) AS munckAmount,
    SUM(total) AS total
  FROM
    billings b
  JOIN
    rigs r ON b.rig_id = r.id 
  WHERE
    b.date >= ${formattedStartDate}
    AND b.date <= ${formattedEndDate}
    AND b.rig_id = ${rigId}::uuid
  GROUP BY
    b.rig_id, r.name;  
`;

    return billings;
  }
}

/* 
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

*/
