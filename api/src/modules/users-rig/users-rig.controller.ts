import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersRigService } from './users-rig.service';
import { CreateManyDto } from './dto/create-many-dto';

@Controller('users-rig')
export class UsersRigController {
  constructor(private readonly usersRigService: UsersRigService) {}

  @Post('/create-many')
  me(@Body() createManyDto: CreateManyDto) {
    return this.usersRigService.createMany(createManyDto);
  }
}
