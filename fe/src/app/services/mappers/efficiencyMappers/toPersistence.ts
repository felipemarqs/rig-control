import dayjs from "dayjs";
import {DomainEfficiency} from "../../../entities/DomainEfficiency";
import {PersistanceEfficiency} from "../../../entities/PersistanceEfficiency";
import {differenceInMinutes, parse} from "date-fns";

export const toPersistence = (domainEfficiency: DomainEfficiency) => {
  let totalAvailableHours = 0;

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
        .minute(Number(startMinuteString));
      const endDateWithTime = dayjs()
        .hour(Number(endHourString))
        .minute(Number(endMinuteString));

      return {
        startHour: startDateWithTime.toISOString(),
        endHour: endDateWithTime.toISOString(),
        classification: classification,
        description: description,
        type: type,
      };
    }
  );

  const toPersistenceObj: PersistanceEfficiency = {
    date: domainEfficiency.date,
    availableHours: Number(totalAvailableHours.toFixed(2)),
    rigId: domainEfficiency.rigId!,
    periods: periodsArray,
    equipmentRatio: [],
    fluidRatio: [],
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
