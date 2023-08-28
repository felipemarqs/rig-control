import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UF } from '../entities/UF';

export class CreateRigDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UF)
  state: UF;
}
