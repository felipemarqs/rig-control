import { Controller, Post, Body, Get } from '@nestjs/common';

import { TemporaryEfficiencyService } from './temporary-efficiencies.service';
import { CreateEfficiencyDto } from './dto/create-efficiency.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('temporary-efficiencies')
export class TemporaryEfficiencyController {
  constructor(
    private readonly temporaryEfficiencyService: TemporaryEfficiencyService,
  ) {}

  @Get()
  get() {
    return this.temporaryEfficiencyService.get();
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createEfficiency: CreateEfficiencyDto,
  ) {
    return this.temporaryEfficiencyService.create(createEfficiency, userId);
  }
}
