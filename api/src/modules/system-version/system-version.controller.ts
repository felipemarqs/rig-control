import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SystemVersionService } from './system-version.service';
import { CreateSystemVersionDto } from './dto/create-system-version.dto';
import { UpdateSystemVersionDto } from './dto/update-system-version.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';

@IsPublic()
@Controller('system-version')
export class SystemVersionController {
  constructor(private readonly systemVersionService: SystemVersionService) {}
  @Get('/latest')
  findFirst() {
    return this.systemVersionService.findFirst();
  }
}
