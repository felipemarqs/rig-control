import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { RequestStatus } from '../entities/deletion-request.entity';

export class CreateDeletionRequestDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  efficiencyId: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsOptional()
  @IsEnum(RequestStatus)
  status: RequestStatus;
}
