import { PartialType } from '@nestjs/mapped-types';
import { CreateRigDto } from './create-rig.dto';

export class UpdateRigDto extends PartialType(CreateRigDto) {}
