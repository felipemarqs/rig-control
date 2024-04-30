import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateUserLogDto {
    @IsNotEmpty()
    @IsDateString()
    loginTime: string;
}
