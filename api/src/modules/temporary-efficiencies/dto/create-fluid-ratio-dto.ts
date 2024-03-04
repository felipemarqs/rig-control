import { IsEnum } from 'class-validator';
import { Interval } from '../entities/Interval';

export class CreateFluidRatioDto {
  @IsEnum(Interval)
  ratio: Interval;
}
