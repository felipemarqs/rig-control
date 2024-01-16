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
} from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PeriodType } from '../efficiencies/entities/PeriodType';
import { PeriodTypeValidationPipe } from 'src/shared/pipes/PeriodTypeValidationPipe';
import { OrderByType } from './entities/OrderByType';
import { OrderByValidationPipe } from 'src/shared/pipes/OrderByValidationPipe';

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
    @Query('orderBy', OrderByValidationPipe) orderBy: OrderByType,
  ) {
    return await this.periodsService.findByPeriodType(
      rigId,
      periodType,
      orderBy,
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
