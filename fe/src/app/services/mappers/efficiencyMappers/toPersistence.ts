import dayjs from "dayjs";
import { DomainEfficiency } from "../../../entities/DomainEfficiency";
import { differenceInMinutes, parse } from "date-fns";
import { ToPersistanceEfficiency } from "../../../entities/PersistanceEfficiency";
import { getTotalHoursFromTimeString } from "../../../utils/getTotalHoursFromTimeString";

export const toPersistence = (domainEfficiency: DomainEfficiency) => {
  let totalAvailableHours = 0;

  const christmasTreeDisassemblyHours = getTotalHoursFromTimeString(
    domainEfficiency.christmasTreeDisassemblyHours
  );

  const bobRentHours = getTotalHoursFromTimeString(
    domainEfficiency.bobRentHours
  );

  const periodsArray = domainEfficiency.periods.map(
    ({
      startHour,
      endHour,
      classification,
      type,
      description,
      repairClassification,
    }) => {
      const [startHourString, startMinuteString] = startHour.split(":");
      const [endHourString, endMinuteString] = endHour.split(":");

      //Soomando as horas totais caso seja operando

      const getDiffInMinutes = (horaFinal: Date, horaInicial: Date) => {
        const isoEndDate = horaFinal.toISOString().split("T")[0];
        const isoHour = horaFinal.toISOString().split("T")[1];

        let endDate = horaFinal;
        if (isoHour === "02:59:00.000Z") {
          endDate = new Date(`${isoEndDate}T03:00:00.000Z`);
        }

        return differenceInMinutes(endDate, horaInicial);
      };

      if (type === "WORKING" || type === "DTM") {
        const horaInicial = parse(startHour, "HH:mm", new Date());
        const horaFinal = parse(endHour, "HH:mm", new Date());
        const diffInMinutes = getDiffInMinutes(horaFinal, horaInicial);

        totalAvailableHours += diffInMinutes / 60;
      }

      const startDateWithTime = dayjs()
        .hour(Number(startHourString))
        .minute(Number(startMinuteString))
        .format();

      const endDateWithTime = dayjs()
        .hour(Number(endHourString))
        .minute(Number(endMinuteString))
        .format();

      return {
        startHour: startDateWithTime.replace(/-03:00$/, "-00:00"),
        endHour: endDateWithTime.replace(/-03:00$/, "-00:00"),
        classification: classification,
        description: description,
        type: type,
        repairClassification: repairClassification
          ? repairClassification
          : null,
      };
    }
  );

  const toPersistenceObj: ToPersistanceEfficiency = {
    date: domainEfficiency.date,
    well: domainEfficiency.well,
    availableHours: Number(totalAvailableHours.toFixed(2)),
    rigId: domainEfficiency.rigId!,
    periods: periodsArray,
    equipmentRatio: [],
    fluidRatio: [],
    christmasTreeDisassemblyHours,
    bobRentHours,
    isMixTankSelected: domainEfficiency.isMixTankSelected,
    isMixTankOperatorsSelected: domainEfficiency.isMixTankOperatorsSelected,
    isMixTankMonthSelected: domainEfficiency.isMixTankMonthSelected,
    isFuelGeneratorSelected: domainEfficiency.isFuelGeneratorSelected,
    isMobilizationSelected: domainEfficiency.isMobilizationSelected,
    isDemobilizationSelected: domainEfficiency.isDemobilizationSelected,
    isTankMixMobilizationSelected:
      domainEfficiency.isTankMixMobilizationSelected,
    isTankMixDemobilizationSelected:
      domainEfficiency.isTankMixDemobilizationSelected,
    isTankMixDTMSelected: domainEfficiency.isTankMixDTMSelected,
    isTruckCartSelected: domainEfficiency.isTruckCartSelected,
    isTruckTankSelected: domainEfficiency.isTruckTankSelected,
    isMunckSelected: domainEfficiency.isMunckSelected,
    isTransportationSelected: domainEfficiency.isTransportationSelected,
    truckKm: domainEfficiency.truckKm,
    isExtraTrailerSelected: domainEfficiency.isExtraTrailerSelected,
    isPowerSwivelSelected: domainEfficiency.isPowerSwivelSelected,
    isSuckingTruckSelected: domainEfficiency.isSuckingTruckSelected,
  };

  domainEfficiency.periods.forEach(({ equipmentRatio, fluidRatio }) => {
    if (equipmentRatio) {
      toPersistenceObj.equipmentRatio.push({
        ratio: equipmentRatio,
      });
    }

    if (fluidRatio) {
      toPersistenceObj.fluidRatio.push({
        ratio: fluidRatio,
      });
    }
  });

  return { toPersistenceObj };
};

/* export class PeriodDto {
    @IsString()
    @IsNotEmpty()
    @IsDateString()
    startHour: string;
  
    @IsString()
    @IsNotEmpty()
    @IsDateString()
    endHour: string;
  
    @IsEnum(PeriodClassification)
    @IsNotEmpty()
    classification: PeriodClassification;
  
    @IsEnum(PeriodType)
    @IsNotEmpty()
    type: PeriodType;
  }
 */

/* export class CreateEfficiencyDto {
    @IsNotEmpty()
    @IsDateString()
    date: string;
  
    @IsNumber()
    @IsNotEmpty()
    availableHours: number;
  
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    rigId: string;
  
    @ValidateNested({ each: true })
    @Type(() => PeriodDto)
    periods: PeriodDto[];
  
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateFluidRatioDto)
    fluidRatio: CreateFluidRatioDto[];
  
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatefluidRatioDto)
    equipmentRatio: CreateEquipmentRatioDto[];
  } */
