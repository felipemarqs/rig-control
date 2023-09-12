import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BillingsConfigurationService } from './billings-configuration.service';
import { CreateBillingsConfigurationDto } from './dto/create-billings-configuration.dto';
import { UpdateBillingsConfigurationDto } from './dto/update-billings-configuration.dto';

@Controller('billings-config')
export class BillingsConfigurationController {
  constructor(
    private readonly billingsConfigurationService: BillingsConfigurationService,
  ) {}

  @Post()
  create(
    @Body() createBillingsConfigurationDto: CreateBillingsConfigurationDto,
  ) {
    return this.billingsConfigurationService.create(
      createBillingsConfigurationDto,
    );
  }

  @Get()
  findAll() {
    return this.billingsConfigurationService.findAll();
  }

  @Get(':rigId')
  findOne(@Param('rigId') rigId: string) {
    return this.billingsConfigurationService.findUnique(rigId);
  }

  @Put(':billingConfigId')
  update(
    @Param('billingConfigId') billingConfigId: string,
    @Body() updateBillingsConfigurationDto: UpdateBillingsConfigurationDto,
  ) {
    return this.billingsConfigurationService.update(
      billingConfigId,
      updateBillingsConfigurationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingsConfigurationService.remove(+id);
  }
}
