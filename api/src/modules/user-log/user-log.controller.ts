import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { UpdateUserLogDto } from './dto/update-user-log.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';

@IsPublic()
@Controller('user-log')
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  @Get()
  findAll() {
    return this.userLogService.findAll();
  }

  @Get('/user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.userLogService.findByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLogDto: UpdateUserLogDto) {
    return this.userLogService.update(+id, updateUserLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLogService.remove(+id);
  }
}
