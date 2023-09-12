import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBillingsConfigurationDto } from './dto/create-billings-configuration.dto';
import { UpdateBillingsConfigurationDto } from './dto/update-billings-configuration.dto';
import { BillingConfigurationsRepository } from 'src/shared/database/repositories/billingConfiguration.repositories';

@Injectable()
export class BillingsConfigurationService {
  constructor(
    private readonly billingConfigRepo: BillingConfigurationsRepository,
  ) {}

  async create(createBillingsConfigurationDto: CreateBillingsConfigurationDto) {
    const configAlreadyExists = await this.billingConfigRepo.findFisrt({
      where: { rigId: createBillingsConfigurationDto.rigId },
    });

    if (configAlreadyExists) {
      throw new ConflictException('Configuração já existe!');
    }

    return this.billingConfigRepo.create({
      data: createBillingsConfigurationDto,
    });
  }

  async findAll() {
    return this.billingConfigRepo.findAll({
      select: {
        id: true,
        availableHourTax: true,
        dtmBt20And50Tax: true,
        dtmGt50Tax: true,
        dtmLt20Tax: true,
        equipmentRatioBt20And50Tax: true,
        equipmentRatioGt50Tax: true,
        equipmentRatioLt20Tax: true,
        fluidRatioBt20And50Tax: true,
        fluidRatioGt50Tax: true,
        fluidRatioLt20Tax: true,
        glossHourTax: true,
        mobilization: true,
        readjustment: true,
        rig: { select: { id: true, name: true } },
      },
    });
  }

  findUnique(rigId: string) {
    return this.billingConfigRepo.findFisrt({
      where: { rigId },
    });
  }

  async update(
    billingConfigId: string,
    updateBillingsConfigurationDto: UpdateBillingsConfigurationDto,
  ) {
    return await this.billingConfigRepo.update({
      where: { id: billingConfigId },
      data: updateBillingsConfigurationDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} billingsConfiguration`;
  }
}
