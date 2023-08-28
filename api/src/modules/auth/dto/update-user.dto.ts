import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './signup.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
