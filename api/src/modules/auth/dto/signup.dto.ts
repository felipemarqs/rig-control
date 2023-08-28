import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { AccessLevel } from '../entities/AccessLevel';

export class CreateUserDto {
  @IsString({ message: 'O nome precisa ser uma String!' })
  @IsNotEmpty({ message: 'O nome é obrigatório!' })
  name: string;

  @IsString({ message: 'O Email precisa ser uma String!' })
  @IsNotEmpty({ message: 'O Email é obrigatório!' })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsNotEmpty()
  @IsEnum(AccessLevel)
  accessLevel: AccessLevel;

  @IsString()
  @IsOptional()
  rigId?: string;
}
