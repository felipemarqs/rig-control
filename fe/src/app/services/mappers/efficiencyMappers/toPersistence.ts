import dayjs from "dayjs";
import {DomainEfficiency} from "../../../entities/DomainEfficiency";
import {differenceInMinutes, parse} from "date-fns";
import {ToPersistanceEfficiency} from "../../../entities/PersistanceEfficiency";
import {getTotalHoursFromTimeString} from "../../../utils/getTotalHoursFromTimeString";

export const toPersistence = (domainEfficiency: DomainEfficiency) => {
  let totalAvailableHours = 0.02;

  console.log("atual domais", domainEfficiency);

  const christmasTreeDisassemblyHours = getTotalHoursFromTimeString(
    domainEfficiency.christmasTreeDisassemblyHours
  );

  const bobRentHours = getTotalHoursFromTimeString(
    domainEfficiency.bobRentHours
  );

  const periodsArray = domainEfficiency.periods.map(
    ({startHour, endHour, classification, type, description}) => {
      const [startHourString, startMinuteString] = startHour.split(":");
      const [endHourString, endMinuteString] = endHour.split(":");

      //Soomando as horas totais caso seja operando

      if (type === "WORKING" || type === '"DTM"') {
        const horaInicial = parse(startHour, "HH:mm", new Date());
        const horaFinal = parse(endHour, "HH:mm", new Date());
        const diffInMinutes = differenceInMinutes(horaFinal, horaInicial);
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
      };
    }
  );

  const toPersistenceObj: ToPersistanceEfficiency = {
    date: domainEfficiency.date,
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
  };

  domainEfficiency.periods.forEach(({equipmentRatio, fluidRatio}) => {
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

  console.log("toPersistenceObj", toPersistenceObj);
  //return;

  return {toPersistenceObj};
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
