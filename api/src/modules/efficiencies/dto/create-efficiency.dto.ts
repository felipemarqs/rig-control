import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { PeriodDto } from './create-period-dto';
import { CreateFluidRatioDto } from './create-fluid-ratio-dto';
import { CreateEquipmentRatioDto } from './create-equipment-ratio-dto';

export class CreateEfficiencyDto {
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
  @Type(() => CreateEquipmentRatioDto)
  equipmentRatio: CreateEquipmentRatioDto[];
}
