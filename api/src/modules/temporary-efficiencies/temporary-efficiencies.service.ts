import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEfficiencyDto } from './dto/create-efficiency.dto';
import { TemporaryEfficienciesRepository } from 'src/shared/database/repositories/temporaryEfficienciesRepositories';
import { WellsRepository } from 'src/shared/database/repositories/well.repositories';
import { UsersRigRepository } from 'src/shared/database/repositories/usersRig.repositories';
import { RigsRepository } from 'src/shared/database/repositories/rigs.repositories';
import { differenceInMinutes, isAfter, isBefore } from 'date-fns';
import { PeriodDto } from './dto/create-period-dto';

@Injectable()
export class TemporaryEfficiencyService {
  constructor(
    private readonly temporaryEfficiencyRepo: TemporaryEfficienciesRepository,
    private readonly wellsRepo: WellsRepository,
    private readonly userRigsRepo: UsersRigRepository,
    private readonly rigsRepo: RigsRepository,
  ) {} //  private readonly temporaryEfficiencyRepo: BillingConfigurationsRepository,

  private isTimeValid(startHour: string, endHour: string): boolean {
    const startTime = new Date(startHour);
    const endTime = new Date(endHour);
    return isBefore(startTime, endTime);
  }

  private readonly selectOptions = {
    id: true,
    date: true,
    // outras propriedades de seleção aqui
  };

  private validatePeriodsTime(periods: PeriodDto[]) {
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
  }

  async create(createEfficiencyDto: CreateEfficiencyDto, userId: string) {
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
      isSuckingTruckSelected,
    } = createEfficiencyDto;

    /**
     * Checks if the provided rig ID belongs to the specified user.
     * If the rig doesn't belong to the user, it throws an UnauthorizedException.
     * @param rigId The ID of the rig.
     * @param userId The ID of the user.
     */
    const rigBelongsToUser = await this.userRigsRepo.findFirst({
      where: { userId, rigId },
    });

    if (!rigBelongsToUser) {
      throw new UnauthorizedException(
        'O usuário não é vinculado a sonda selecionada!',
      );
    }

    /**
     * Checks if an efficiency entry already exists for the given rig ID and date.
     * If an entry already exists, it throws a ConflictException.
     * @param rigId The ID of the rig.
     * @param date The date for which to check the existence of an efficiency entry.
     */
    const efficiencyAlreadyExists =
      await this.temporaryEfficiencyRepo.findFirst({
        where: { rigId, date },
      });

    if (efficiencyAlreadyExists) {
      await this.remove(efficiencyAlreadyExists.id);
    }

    /**
     * Checks if each well in the provided periods exists in the database.
     * If a well doesn't exist, it creates a new entry for it.
     * @param periods The array of periods containing well IDs.
     */
    for (const { wellId } of periods) {
      const wellExist = await this.wellsRepo.findFirst({
        where: { name: wellId },
      });

      if (!wellExist) {
        await this.wellsRepo.create({ data: { name: wellId } });
      }
    }

    /**
     * Checks if the periods provided overlap or are invalid.
     * @param periods The array of periods to check.
     */
    this.validatePeriodsTime(periods);

    /**
     * Constructs the efficiency data object with the provided information.
     * @param createEfficiencyDto The DTO containing the information to construct the efficiency data object.
     * @returns The constructed efficiency data object.
     */
    const efficiencyData = {
      date,
      well,
      availableHours,
      dtmHours: 0,
      rigId,
      userId,
      christmasTreeDisassemblyHours: christmasTreeDisassemblyHours,
      bobRentHours: bobRentHours,
      hasDemobilization: isDemobilizationSelected,
      hasMobilization: isMobilizationSelected,
      hasExtraTrailer: isExtraTrailerSelected,
      hasGeneratorFuel: isFuelGeneratorSelected,
      hasMixTankDemobilization: isTankMixDemobilizationSelected,
      hasMixTankDtm: isTankMixDTMSelected,
      hasMixTankHourRent: isMixTankSelected,
      hasMixTankMobilization: isTankMixMobilizationSelected,
      hasMixTankMonthRent: isMixTankMonthSelected,
      hasMixTankOperator: isMixTankOperatorsSelected,
      hasMunck: isMunckSelected,
      hasPowerSwivel: isPowerSwivelSelected,
      hasSuckingTruck: isSuckingTruckSelected,
      hasTransportation: isTransportationSelected,
      hasTruckCartRent: isTruckCartSelected,
      hasTruckTank: isTruckTankSelected,
      truckKmHours: truckKm,
      temporaryPeriods: {
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

    let scheduledStopTotalHours = 0;
    let dtmLt20TotalHours = 0;
    let dtmBt20And50TotalHours = 0;
    let dtmGt50TotalHours = 0;

    const wells = await this.wellsRepo.findAll({});

    /**
     * Iterates through each period, updating wellId based on the name found in wells array.
     * Calculates the difference in minutes between start and end hour for each period.
     * Updates total amounts and hours based on period type and classification.
     * @param periods The array of periods to iterate through.
     * @param wells The array of wells to search for matching names.
     */
    periods.forEach(({ type, startHour, endHour, classification }, index) => {
      // Find the corresponding well ID in the wells array
      const { id: wellIdFound } = wells.find(({ name }) => well === name);

      // Update wellId for the current period
      periods[index].wellId = wellIdFound;

      // Convert startHour and endHour to Date objects
      const horaInicial = new Date(startHour);
      const horaFinal = new Date(endHour);

      // Function to calculate the difference in minutes between two dates
      const getDiffInMinutes = (finalHour: Date, initialHour: Date) => {
        // Get the ISO hour from the finalHour
        const isoHour = finalHour.toISOString().split('T')[1];

        // Adjust endDate if isoHour is '23:59'
        let endDate = finalHour;
        if (isoHour.slice(0, 5) === '23:59') {
          return differenceInMinutes(endDate, initialHour) + 1; // Adding 1 minute
        }

        // Return the difference in minutes between endDate and initialHour
        return differenceInMinutes(endDate, initialHour);
      };

      // Calculate the difference in minutes between start and end hour
      const diffInMinutes = getDiffInMinutes(horaFinal, horaInicial);

      // Update total amounts and hours based on period type and classification
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

      if (type === 'SCHEDULED_STOP') {
        scheduledStopTotalHours += diffInMinutes / 60;
      }
    });

    efficiencyData['dtmHours'] =
      dtmLt20TotalHours + dtmGt50TotalHours + dtmBt20And50TotalHours;

    const efficiency = await this.temporaryEfficiencyRepo.create({
      data: efficiencyData,
    });

    return efficiency;
  }

  async findById(efficiencyId: string) {
    return this.temporaryEfficiencyRepo.findUnique({
      where: { id: efficiencyId },
      select: {
        id: true,
        date: true,
        availableHours: true,
        rigId: true,
        userId: true,
        christmasTreeDisassemblyHours: true,
        bobRentHours: true,
        hasDemobilization: true,
        hasExtraTrailer: true,
        hasGeneratorFuel: true,
        hasMixTankDemobilization: true,
        hasMixTankDtm: true,
        hasMixTankHourRent: true,
        hasMixTankMobilization: true,
        hasMixTankMonthRent: true,
        hasMixTankOperator: true,
        hasMunck: true,
        hasPowerSwivel: true,
        hasSuckingTruck: true,
        hasTransportation: true,
        hasTruckCartRent: true,
        truckKmHours: true,
        well: true,
        hasTruckTank: true,
        rig: true,
        user: {
          select: {
            name: true,
          },
        },
        temporaryPeriods: {
          select: {
            temporaryEfficiencyId: true,
            id: true,
            startHour: true,
            endHour: true,
            classification: true,
            description: true,
            type: true,
            repairClassification: true,
            well: true,
          },
          orderBy: { startHour: 'asc' },
        },
        equipmentRatio: { select: { ratio: true } },
        fluidRatio: { select: { ratio: true } },
      },
    });
  }

  async findByUserId(userId: string) {
    return this.temporaryEfficiencyRepo.findMany({
      where: { userId },
      select: {
        id: true,
        date: true,
        availableHours: true,
        rigId: true,
        userId: true,
        christmasTreeDisassemblyHours: true,
        bobRentHours: true,
        hasDemobilization: true,
        hasExtraTrailer: true,
        hasGeneratorFuel: true,
        hasMixTankDemobilization: true,
        hasMixTankDtm: true,
        hasMixTankHourRent: true,
        hasMixTankMobilization: true,
        hasMixTankMonthRent: true,
        hasMixTankOperator: true,
        hasMunck: true,
        hasPowerSwivel: true,
        hasSuckingTruck: true,
        hasTransportation: true,
        hasTruckCartRent: true,
        truckKmHours: true,
        well: true,
        hasTruckTank: true,
        rig: true,
        user: {
          select: {
            name: true,
          },
        },
        temporaryPeriods: {
          select: {
            temporaryEfficiencyId: true,
            id: true,
            startHour: true,
            endHour: true,
            classification: true,
            description: true,
            type: true,
            repairClassification: true,
            well: true,
          },
          orderBy: { startHour: 'asc' },
        },
        equipmentRatio: { select: { ratio: true } },
        fluidRatio: { select: { ratio: true } },
      },
    });
  }

  async remove(efficiencyId: string) {
    await this.temporaryEfficiencyRepo.delete({ where: { id: efficiencyId } });
    return null;
  }
}
