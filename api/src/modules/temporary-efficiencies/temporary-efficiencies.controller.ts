import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
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

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createEfficiency: CreateEfficiencyDto,
  ) {
    return this.temporaryEfficiencyService.create(createEfficiency, userId);
  }
}
