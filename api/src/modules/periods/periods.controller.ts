import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PeriodType } from '../efficiencies/entities/PeriodType';
import { PeriodTypeValidationPipe } from 'src/shared/pipes/PeriodTypeValidationPipe';
import { OrderByType } from './entities/OrderByType';
import { OrderByValidationPipe } from 'src/shared/pipes/OrderByValidationPipe';
import { PeriodClassification } from '../efficiencies/entities/PeriodClassification';
import { PeriodClassificationValidationPipe } from 'src/shared/pipes/PeriodClassificationValidationPipe';
import { RepairClassification } from '../efficiencies/entities/RepairClassification';

@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Post()
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodsService.create(createPeriodDto);
  }

  @Get()
  async findByPeriodType(
    @Query('rigId', ParseUUIDPipe) rigId: string,
    @Query('periodType', PeriodTypeValidationPipe) periodType: PeriodType,
    @Query('periodClassification', PeriodClassificationValidationPipe)
    periodClassification: PeriodClassification,
    @Query('repairClassification')
    repairClassification: RepairClassification | null,
    @Query('orderBy', OrderByValidationPipe) orderBy: OrderByType,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('pageSize') pageSize: string,
    @Query('pageIndex') pageIndex: string,
  ) {
    return await this.periodsService.findByPeriodType(
      rigId,
      periodType,
      periodClassification,
      repairClassification,
      orderBy,
      startDate,
      endDate,
      pageSize,
      pageIndex,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeriodDto: UpdatePeriodDto) {
    return this.periodsService.update(+id, updatePeriodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodsService.remove(+id);
  }
}
