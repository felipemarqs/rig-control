import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateEfficiencyDto } from './dto/create-efficiency.dto';
import { UpdateEfficiencyDto } from './dto/update-efficiency.dto';
import { EfficienciesRepository } from 'src/shared/database/repositories/efficiencies.repositories';
import { UsersRigRepository } from 'src/shared/database/repositories/usersRig.repositories';
import { isAfter, isBefore, parse, differenceInMinutes } from 'date-fns';
import { RigsRepository } from 'src/shared/database/repositories/rigs.repositories';
import { BillingConfigurationsRepository } from 'src/shared/database/repositories/billingConfiguration.repositories';
import { BillingRepository } from 'src/shared/database/repositories/billing.repositories';

@Injectable()
export class EfficienciesService {
  constructor(
    private readonly efficiencyRepo: EfficienciesRepository,
    private readonly userRigsRepo: UsersRigRepository,
    private readonly rigsRepo: RigsRepository,
    private readonly billingConfigRepo: BillingConfigurationsRepository,
    private readonly billingRepo: BillingRepository,
    private readonly prisma: PrismaClient,
  ) {}

  private isTimeValid(startHour: string, endHour: string): boolean {
    const startTime = new Date(startHour);
    const endTime = new Date(endHour);
    return isBefore(startTime, endTime);
  }

  async create(createEfficiencyDto: CreateEfficiencyDto, userId: string) {
    console.log(createEfficiencyDto);
    const {
      rigId,
      date,
      well,
      availableHours,
      periods,
      fluidRatio,
      equipmentRatio,
      isMixTankSelected,
      isMixTankOperatorsSelected,
      isMixTankMonthSelected,
      isFuelGeneratorSelected,
      isMobilizationSelected,
      isDemobilizationSelected,
      isTankMixMobilizationSelected,
      isTankMixDemobilizationSelected,
      isTankMixDTMSelected,
      bobRentHours,
      christmasTreeDisassemblyHours,
      isTruckCartSelected,
      isTruckTankSelected,
      isMunckSelected,
      isTransportationSelected,
      truckKm,
      isExtraTrailerSelected,
      isPowerSwivelSelected,
      mobilizationPlace,
      isSuckingTruckSelected,
    } = createEfficiencyDto;

    const rigBelongsToUser = await this.userRigsRepo.findFirst({
      where: { userId, rigId },
    });

    if (!rigBelongsToUser) {
      throw new UnauthorizedException(
        'O usuário não é vinculado a sonda selecionada!',
      );
    }

    const efficiencyAlreadyExists = await this.efficiencyRepo.findFirst({
      where: { rigId, date },
    });

    if (efficiencyAlreadyExists) {
      throw new ConflictException('Data já preenchida!');
    }

    const rigBillingConfiguration = await this.billingConfigRepo.findFisrt({
      where: { rigId },
    });

    for (let i = 0; i < periods.length; i++) {
      const currentPeriod = periods[i];

      if (i > 0) {
        const previousPeriod = periods[i - 1];
        if (
          isAfter(
            new Date(currentPeriod.startHour),
            new Date(previousPeriod.endHour),
          )
        ) {
          throw new ConflictException(
            'Horários de período se sobrepõem ou são inválidos.',
          );
        }
      }

      if (!this.isTimeValid(currentPeriod.startHour, currentPeriod.endHour)) {
        throw new ConflictException(
          'Horário inválido. A hora de início deve ser antes da hora final.',
        );
      }
    }

    const efficiencyData = {
      date,
      well,
      availableHours,
      dtmHours: 0,
      rigId,
      userId,
      periods: {
        createMany: {
          data: periods,
        },
      },
    };

    if (equipmentRatio?.length > 0) {
      efficiencyData['equipmentRatio'] = {
        createMany: {
          data: equipmentRatio,
        },
      };
    }

    if (fluidRatio?.length > 0) {
      efficiencyData['fluidRatio'] = {
        createMany: {
          data: fluidRatio,
        },
      };
    }

    //criando valores de faturamento
    // Talvez mudar isso aqui de lugar

    let availableHourTotalHours = 0;
    let glossHourTotalHours = 0;
    let dtmLt20TotalHours = 0;
    let dtmBt20And50TotalHours = 0;
    let dtmGt50TotalHours = 0;
    let fluidLt20TotalAmmount = 0;
    let fluidBt20And50TotalAmmount = 0;
    let fluidGt50TotalAmmount = 0;
    let equipmentLt20TotalAmmount = 0;
    let equipmentBt20And50TotalAmmount = 0;
    let equipmentGt50TotalAmmount = 0;
    let mobilizationTotalAmount = 0;
    let demobilizationTotalAmount = 0;
    let extraTrailerTotalAmount = 0;
    let powerSwivelTotalAmount = 0;
    let truckCartRentTotalAmount = 0;
    let transportationTotalAmount = 0;
    let truckKmTotalAmount = 0;
    let bobRentTotalAmount = 0;
    let truckTankTotalAmount = 0;
    let munckTotalAmount = 0;
    let mixTankMonthRentTotalAmount = 0;
    let mixTankHourRentTotalAmount = 0;
    let generatorFuelTotalAmount = 0;
    let mixTankOperatorTotalAmount = 0;
    let mixTankDTMTotalAmount = 0;
    let mixTankMobilizationTotalAmount = 0;
    let mixTankDemobilizationTotalAmount = 0;
    let suckingTruckTotalAmount = 0;
    let christmasTreeDisassemblyTotalAmount = 0;

    periods.forEach(({ type, startHour, endHour, classification }) => {
      const horaInicial = new Date(startHour);
      const horaFinal = new Date(endHour);
      const diffInMinutes = differenceInMinutes(horaFinal, horaInicial);

      if (type === 'DTM') {
        if (classification === 'LT20') {
          dtmLt20TotalHours += diffInMinutes / 60;
        }

        if (classification === 'BT20AND50') {
          dtmBt20And50TotalHours += diffInMinutes / 60;
        }

        if (classification === 'GT50') {
          dtmGt50TotalHours += diffInMinutes / 60;
        }
      }

      if (type === 'GLOSS' || type === 'REPAIR') {
        glossHourTotalHours += diffInMinutes / 60;
      }

      if (type === 'WORKING') {
        availableHourTotalHours += diffInMinutes / 60;
      }
    });

    if (equipmentRatio?.length) {
      equipmentRatio.forEach(({ ratio }) => {
        if (ratio === 'LT20') {
          equipmentLt20TotalAmmount++;
        }

        if (ratio === 'BT20AND50') {
          equipmentBt20And50TotalAmmount++;
        }

        if (ratio === 'GT50') {
          equipmentGt50TotalAmmount++;
        }
      });
    }

    if (fluidRatio?.length) {
      fluidRatio.forEach(({ ratio }) => {
        if (ratio === 'LT20') {
          fluidLt20TotalAmmount++;
        }

        if (ratio === 'BT20AND50') {
          fluidBt20And50TotalAmmount++;
        }

        if (ratio === 'GT50') {
          fluidGt50TotalAmmount++;
        }
      });
    }

    const availableHourAmount =
      availableHourTotalHours * rigBillingConfiguration.availableHourTax;
    const glossHourAmount =
      glossHourTotalHours * rigBillingConfiguration.glossHourTax;
    const dtmLt20Amount =
      dtmLt20TotalHours * rigBillingConfiguration.dtmLt20Tax;

    const dtmBt20And50Amount =
      dtmBt20And50TotalHours * rigBillingConfiguration.dtmBt20And50Tax;

    const dtmGt50Amount =
      dtmGt50TotalHours * rigBillingConfiguration.dtmGt50Tax;

    const fluidLt20Amount =
      fluidLt20TotalAmmount * rigBillingConfiguration.fluidRatioLt20Tax;

    const fluidBt20And50Amount =
      fluidBt20And50TotalAmmount *
      rigBillingConfiguration.fluidRatioBt20And50Tax;

    const fluidGt50Amount =
      fluidGt50TotalAmmount * rigBillingConfiguration.fluidRatioGt50Tax;

    const equipmentLt20Amount =
      equipmentLt20TotalAmmount * rigBillingConfiguration.equipmentRatioLt20Tax;

    const equipmentBt20And50Amount =
      equipmentBt20And50TotalAmmount *
      rigBillingConfiguration.equipmentRatioBt20And50Tax;

    const equipmentGt50Amount =
      equipmentGt50TotalAmmount * rigBillingConfiguration.equipmentRatioGt50Tax;

    const dtmHourAmount =
      (dtmLt20TotalHours + dtmBt20And50TotalHours + dtmGt50TotalHours) *
      rigBillingConfiguration.dtmHourTax;

    const christmasTreeDisassemblyAmount =
      christmasTreeDisassemblyHours *
      rigBillingConfiguration.christmasTreeDisassemblyTax;

    if (isTankMixDemobilizationSelected) {
      mixTankDemobilizationTotalAmount =
        rigBillingConfiguration.mixTankDemobilizationTax;
    }

    if (isTankMixMobilizationSelected) {
      mixTankMobilizationTotalAmount =
        rigBillingConfiguration.mixTankMobilizationTax;
    }

    if (isTankMixDTMSelected) {
      mixTankDTMTotalAmount = rigBillingConfiguration.mixTankDtmTax;
    }

    if (isMixTankOperatorsSelected) {
      mixTankOperatorTotalAmount = rigBillingConfiguration.mixTankOperatorTax;
    }
    if (isMixTankMonthSelected) {
      mixTankMonthRentTotalAmount = rigBillingConfiguration.mixTankMonthRentTax;
    }

    if (isMixTankSelected) {
      mixTankHourRentTotalAmount = rigBillingConfiguration.mixTankHourRentTax;
    }

    if (isFuelGeneratorSelected) {
      generatorFuelTotalAmount = rigBillingConfiguration.generatorFuelTax;
    }

    if (isMunckSelected) {
      munckTotalAmount = rigBillingConfiguration.munckTax;
    }

    if (isTruckTankSelected) {
      truckTankTotalAmount = rigBillingConfiguration.truckTankTax;
    }

    if (isMobilizationSelected) {
      mobilizationTotalAmount = rigBillingConfiguration.mobilization;
    }

    if (isDemobilizationSelected) {
      demobilizationTotalAmount = rigBillingConfiguration.demobilization;
    }

    if (isExtraTrailerSelected) {
      extraTrailerTotalAmount = rigBillingConfiguration.extraTrailerTax;
    }

    if (isPowerSwivelSelected) {
      powerSwivelTotalAmount = rigBillingConfiguration.powerSwivelTax;
    }

    if (isSuckingTruckSelected) {
      suckingTruckTotalAmount = rigBillingConfiguration.suckingTruckTax;
    }

    if (isTransportationSelected) {
      transportationTotalAmount = rigBillingConfiguration.transportationTax;
    }

    if (isTruckCartSelected) {
      truckCartRentTotalAmount = rigBillingConfiguration.truckCartRentTax;
    }

    const totalAmmount =
      (availableHourAmount +
        dtmHourAmount +
        glossHourAmount +
        dtmLt20Amount +
        dtmBt20And50Amount +
        dtmGt50Amount +
        fluidLt20Amount +
        fluidBt20And50Amount +
        fluidGt50Amount +
        equipmentLt20Amount +
        equipmentBt20And50Amount +
        equipmentGt50Amount) *
      rigBillingConfiguration.readjustment;

    efficiencyData['dtmHours'] =
      dtmLt20TotalHours + dtmGt50TotalHours + dtmBt20And50TotalHours;

    const efficiency = await this.efficiencyRepo.create({
      data: efficiencyData,
    });

    bobRentTotalAmount = rigBillingConfiguration.bobRentTax * bobRentHours;

    truckKmTotalAmount = rigBillingConfiguration.truckKmTax * truckKm;

    await this.billingRepo.create({
      data: {
        christmasTreeDisassemblyAmount,
        mixTankDemobilizationAmount: mixTankDemobilizationTotalAmount,
        mixTankDtmAmount: mixTankDTMTotalAmount,
        mixTankMobilizationAmount: mixTankMobilizationTotalAmount,
        mixTankOperatorAmount: mixTankOperatorTotalAmount,
        munckAmount: munckTotalAmount,
        truckTankAmount: truckTankTotalAmount,
        bobRentAmount: bobRentTotalAmount, //Temporário
        demobilizationAmount: demobilizationTotalAmount, //Temporário
        dtmHourAmount,
        extraTrailerAmount: extraTrailerTotalAmount, //Temporário
        generatorFuelAmount: generatorFuelTotalAmount, //Temporário //Temporário
        mixTankHourRentAmount: mixTankHourRentTotalAmount, //Temporário
        mixTankMonthRentAmount: mixTankMonthRentTotalAmount, //Temporário
        mobilizationAmount: mobilizationTotalAmount, //Temporário
        powerSwivelAmount: powerSwivelTotalAmount, //Temporário
        suckingTruckAmount: suckingTruckTotalAmount, //Temporário
        transportationAmount: transportationTotalAmount, //Temporário
        truckCartRentAmount: truckCartRentTotalAmount, //Temporário
        truckKmAmount: truckKmTotalAmount, //Temporário
        availableHourAmount,
        glossHourAmount,
        dtmLt20Amount,
        dtmBt20And50Amount,
        dtmGt50Amount,
        fluidLt20Amount,
        fluidBt20And50Amount,
        fluidGt50Amount,
        equipmentLt20Amount,
        equipmentBt20And50Amount,
        equipmentGt50Amount,
        date,
        efficiencyId: efficiency.id,
        rigId,
        total: totalAmmount,
      },
    });

    return efficiency;
  }

  async findAllByRigId(filters: {
    rigId: string;
    startDate: string;
    endDate: string;
  }) {
    const rigExists = await this.rigsRepo.findUnique({
      where: {
        id: filters.rigId,
      },
    });

    if (!rigExists) {
      throw new NotFoundException('Sonda não encontrada');
    }
    const efficiencies = await this.efficiencyRepo.findMany({
      where: {
        rigId: filters.rigId,
        date: {
          gte: new Date(filters.startDate),
          lte: new Date(filters.endDate),
        },
      },
      orderBy: {
        date: 'asc',
      },
      select: {
        id: true,
        rigId: true,
        userId: true,
        date: true,
        availableHours: true,
        periods: true,
        user: { select: { name: true } },
        rig: { select: { name: true, state: true } },
        fluidRatio: {
          select: {
            ratio: true,
          },
        },
        equipmentRatio: {
          select: {
            ratio: true,
          },
        },
      },
    });

    return efficiencies;
  }

  update(id: number, updateEfficiencyDto: UpdateEfficiencyDto) {
    return `This action updates a #${id} efficiency`;
  }

  async findById(efficiencyId: string) {
    const efficiency = await this.efficiencyRepo.findUnique({
      where: {
        id: efficiencyId,
      },
      select: {
        id: true,
        date: true,
        availableHours: true,
        rigId: true,
        userId: true,
        user: {
          select: {
            name: true,
          },
        },
        periods: {
          select: {
            efficiencyId: true,
            id: true,
            startHour: true,
            endHour: true,
            classification: true,
            description: true,
            type: true,
          },
          orderBy: { startHour: 'asc' },
        },
        equipmentRatio: { select: { ratio: true } },
        fluidRatio: { select: { ratio: true } },
      },
    });

    if (!efficiency) {
      throw new NotFoundException('Efficiencia não encontrada!');
    }

    return efficiency;
  }

  async remove(efficiencyId: string) {
    await this.efficiencyRepo.delete({ where: { id: efficiencyId } });
    return null;
  }

  async getAverage(rigId: string) {
    //const rigId = '073168f7-b634-466d-aaee-a7968a39e2b1';
    //Mudar para params depois
    const ano = 2023;

    return await this.efficiencyRepo.getAverage(rigId);
  }
}
