import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRigDto } from './dto/create-rig.dto';

import { RigsRepository } from 'src/shared/database/repositories/rigs.repositories';

@Injectable()
export class RigsService {
  constructor(private readonly rigsRepo: RigsRepository) {}
  async create(createRigDto: CreateRigDto) {
    const {
      name,
      state,
      isActive,
      contractId,
      availableHourTax,
      bobRentTax,
      demobilization,
      dtmBt20And50Tax,
      dtmGt50Tax,
      dtmHourTax,
      dtmLt20Tax,
      equipmentRatioBt20And50Tax,
      equipmentRatioGt50Tax,
      equipmentRatioLt20Tax,
      extraTrailerTax,
      fluidRatioBt20And50Tax,
      fluidRatioGt50Tax,
      fluidRatioLt20Tax,
      generatorFuelTax,
      glossHourTax,
      mixTankDemobilizationTax,
      mixTankDtmTax,
      mixTankHourRentTax,
      mixTankMobilizationTax,
      mixTankMonthRentTax,
      mixTankOperatorTax,
      mobilization,
      powerSwivelTax,
      readjustment,
      suckingTruckTax,
      transportationTax,
      truckCartRentTax,
      truckKmTax,
    } = createRigDto;

    const rigNameAlreadyExists = await this.rigsRepo.findUnique({
      where: { name },
    });

    if (rigNameAlreadyExists) {
      throw new ConflictException('Nome já cadastrado!');
    }
    return this.rigsRepo.create({
      data: {
        name,
        state,
        contractId,
        BillingConfiguration: {
          create: {
            availableHourTax,
            bobRentTax,
            demobilization,
            dtmBt20And50Tax,
            dtmGt50Tax,
            dtmHourTax,
            dtmLt20Tax,
            equipmentRatioBt20And50Tax,
            equipmentRatioGt50Tax,
            equipmentRatioLt20Tax,
            extraTrailerTax,
            fluidRatioBt20And50Tax,
            fluidRatioGt50Tax,
            fluidRatioLt20Tax,
            generatorFuelTax,
            glossHourTax,
            mixTankDemobilizationTax,
            mixTankDtmTax,
            mixTankHourRentTax,
            mixTankMobilizationTax,
            mixTankMonthRentTax,
            mixTankOperatorTax,
            mobilization,
            powerSwivelTax,
            readjustment,
            suckingTruckTax,
            transportationTax,
            truckCartRentTax,
            truckKmTax,
          },
        },
      },
    });
  }

  async findAll() {
    return this.rigsRepo.findAll();
  }
}
