import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { BillingsConfigurationService } from './billings-configuration.service';
import { CreateBillingsConfigurationDto } from './dto/create-billings-configuration.dto';
import { UpdateBillingsConfigurationDto } from './dto/update-billings-configuration.dto';
import { IsUserAdm } from 'src/shared/decorators/IsUserAdm';

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
  findAll(@IsUserAdm() isUserAdm: boolean) {
    if (!isUserAdm) {
      throw new UnauthorizedException('Acesso Restrito!');
    }
    return this.billingsConfigurationService.findAll();
  }

  @Get(':rigId')
  findOne(@IsUserAdm() isUserAdm: boolean, @Param('rigId') rigId: string) {
    if (!isUserAdm) {
      throw new UnauthorizedException('Acesso Restrito!');
    }
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
