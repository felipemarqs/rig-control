import { Controller, Get, ParseUUIDPipe, Query } from '@nestjs/common';
import { BillingsService } from './billings.service';

@Controller('billings')
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @Get()
  async findByRigId(
    @Query('rigId', ParseUUIDPipe) rigId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const res = await this.billingsService.findByRigId({
      rigId,
      startDate,
      endDate,
    });

    console.log(res);
    return res;
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
