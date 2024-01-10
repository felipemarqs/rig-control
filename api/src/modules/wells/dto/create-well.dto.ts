import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWellDto {
  @IsString({ message: 'O nome precisa ser uma String!' })
  @IsNotEmpty({ message: 'O nome é obrigatório!' })
  name: string;
}
