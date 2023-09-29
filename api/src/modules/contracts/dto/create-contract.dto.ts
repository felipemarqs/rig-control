import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateContractDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
