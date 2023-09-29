import { Controller, Get, ParseUUIDPipe, Query } from '@nestjs/common';
import { BillingsService } from './billings.service';

@Controller('billings')
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @Get()
  findByEfficiency(@Query('efficiencyId', ParseUUIDPipe) efficiencyId: string) {
    return this.billingsService.findByEfficiencyId(efficiencyId);
  }

  @Get('/all')
  async findAll(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.billingsService.findAll({ startDate, endDate });
  }
}

//databox
