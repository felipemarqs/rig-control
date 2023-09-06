import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { EfficienciesService } from './efficiencies.service';
import { CreateEfficiencyDto } from './dto/create-efficiency.dto';
import { UpdateEfficiencyDto } from './dto/update-efficiency.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('efficiencies')
export class EfficienciesController {
  constructor(private readonly efficienciesService: EfficienciesService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createEfficiencyDto: CreateEfficiencyDto,
  ) {
    return this.efficienciesService.create(createEfficiencyDto, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEfficiencyDto: UpdateEfficiencyDto,
  ) {
    return this.efficienciesService.update(+id, updateEfficiencyDto);
  }

  @Get()
  findAll(
    @Query('rigId', ParseUUIDPipe) rigId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.efficienciesService.findAllByRigId({
      rigId,
      startDate,
      endDate,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':efficiencyId')
  remove(@Param('efficiencyId', ParseUUIDPipe) efficiencyId: string) {
    return this.efficienciesService.remove(efficiencyId);
  }
}
