import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { TemporaryEfficiencyService } from './temporary-efficiencies.service';
import { CreateEfficiencyDto } from './dto/create-efficiency.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('temporary-efficiencies')
export class TemporaryEfficiencyController {
  constructor(
    private readonly temporaryEfficiencyService: TemporaryEfficiencyService,
  ) {}

  @Get(':efficiencyId')
  findById(@Param('efficiencyId', ParseUUIDPipe) efficiencyId: string) {
    return this.temporaryEfficiencyService.findById(efficiencyId);
  }

  @Get('/user/:userId')
  getByUserId(@Param('userId') userId: string) {
    return this.temporaryEfficiencyService.findByUserId(userId);
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createEfficiency: CreateEfficiencyDto,
  ) {
    return this.temporaryEfficiencyService.create(createEfficiency, userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':efficiencyId')
  remove(@Param('efficiencyId', ParseUUIDPipe) efficiencyId: string) {
    return this.temporaryEfficiencyService.remove(efficiencyId);
  }
}
