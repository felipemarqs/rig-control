import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBillingsConfigurationDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  rigId: string;

  @IsNumber()
  @IsNotEmpty()
  availableHourTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  glossHourTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  dtmLt20Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  dtmBt20And50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  dtmGt50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  dtmHourTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  fluidRatioLt20Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  fluidRatioBt20And50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  fluidRatioGt50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  equipmentRatioLt20Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  equipmentRatioBt20And50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  equipmentRatioGt50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  truckCartRentTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  extraTrailerTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  powerSwivelTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  transportationTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  truckKmTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  bobRentTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mixTankMonthRentTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mixTankHourRentTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  generatorFuelTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mixTankOperatorTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mixTankDtmTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mixTankMobilizationTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mixTankDemobilizationTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  suckingTruckTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readjustment: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  mobilization: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  demobilization: number;
}
