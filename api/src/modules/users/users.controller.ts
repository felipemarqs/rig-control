import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsUserAdm } from 'src/shared/decorators/IsUserAdm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Get()
  findAll(
    @IsUserAdm() isUserAdm: boolean,
    @Query('contractId') contractId?: string,
  ) {
    if (!isUserAdm) {
      throw new UnauthorizedException('Acesso Restrito!');
    }
    console.log('is user Adm?', isUserAdm);
    return this.usersService.findAll({ contractId });
  }

  @Put(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }
}
