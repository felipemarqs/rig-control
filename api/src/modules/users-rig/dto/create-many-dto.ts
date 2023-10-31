import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateManyDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  rigs: string[];
}
