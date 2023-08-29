import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { PeriodClassification } from '../entities/PeriodClassification';
import { PeriodType } from '../entities/PeriodType';

export class PeriodDto {
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
