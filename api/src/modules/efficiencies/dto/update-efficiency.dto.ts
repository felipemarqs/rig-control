import { PartialType } from '@nestjs/mapped-types';
import { CreateEfficiencyDto } from './create-efficiency.dto';

export class UpdateEfficiencyDto extends PartialType(CreateEfficiencyDto) {}
