import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

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
  glossHourTax: number;

  @IsNumber()
  @IsNotEmpty()
  dtmLt20Tax: number;

  @IsNumber()
  @IsNotEmpty()
  dtmBt20And50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  dtmGt50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  fluidRatioLt20Tax: number;

  @IsNumber()
  @IsNotEmpty()
  fluidRatioBt20And50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  fluidRatioGt50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  equipmentRatioLt20Tax: number;

  @IsNumber()
  @IsNotEmpty()
  equipmentRatioBt20And50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  equipmentRatioGt50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  readjustment: number;

  @IsNumber()
  @IsNotEmpty()
  mobilization: number;
}
