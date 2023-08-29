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

  @Get()
  findAll() {
    return this.efficienciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.efficienciesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEfficiencyDto: UpdateEfficiencyDto,
  ) {
    return this.efficienciesService.update(+id, updateEfficiencyDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':efficiencyId')
  remove(@Param('efficiencyId', ParseUUIDPipe) efficiencyId: string) {
    return this.efficienciesService.remove(efficiencyId);
  }
}
