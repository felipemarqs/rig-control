import { IsEnum } from 'class-validator';
import { Interval } from '../entities/Interval';

export class CreateEquipmentRatioDto {
  @IsEnum(Interval)
  ratio: Interval;
}
