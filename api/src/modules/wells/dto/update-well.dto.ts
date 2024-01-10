import { PartialType } from '@nestjs/mapped-types';
import { CreateWellDto } from './create-well.dto';

export class UpdateWellDto extends PartialType(CreateWellDto) {}
