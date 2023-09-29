import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
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

  @IsOptional()
  @IsBoolean()
  isMixTankSelected: boolean;

  @IsOptional()
  @IsBoolean()
  isMixTankOperatorsSelected: boolean;

  @IsOptional()
  @IsBoolean()
  isMixTankMonthSelected: boolean;

  @IsOptional()
  @IsBoolean()
  isFuelGeneratorSelected: boolean;

  @IsOptional()
  @IsBoolean()
  isMobilizationSelected: boolean;

  @IsOptional()
  @IsBoolean()
  isDemobilizationSelected: boolean;

  @IsOptional()
  @IsBoolean()
  isTankMixMobilizationSelected: boolean;

  @IsOptional()
  @IsBoolean()
  isTankMixDemobilizationSelected: boolean;

  @IsOptional()
  @IsBoolean()
  isTankMixDTMSelected: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  bobRentHours: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  christmasTreeDisassemblyHours: number;

  @IsOptional()
  @IsBoolean()
  isTruckCartSelected: boolean;

  @IsOptional()
  @IsBoolean()
  isTruckTankSelected: boolean;

  @IsOptional()
  @IsBoolean()
  isMunckSelected: boolean;

  @IsOptional()
  @IsBoolean()
  isTransportationSelected: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  truckKm: number;

  @IsOptional()
  @IsBoolean()
  isExtraTrailerSelected: boolean;

  @IsOptional()
  @IsBoolean()
  isPowerSwivelSelected: boolean;

  @IsOptional()
  @IsString()
  mobilizationPlace: string;

  @IsOptional()
  @IsBoolean()
  isSuckingTruckSelected: boolean;
}
