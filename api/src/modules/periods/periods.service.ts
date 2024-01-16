import { Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PeriodsRepository } from 'src/shared/database/repositories/period.repositories';
import { RepairClassification } from '../efficiencies/entities/RepairClassification';
import { PeriodType } from '../efficiencies/entities/PeriodType';

@Injectable()
export class PeriodsService {
  constructor(private readonly periodsRepo: PeriodsRepository) {}
  create(createPeriodDto: CreatePeriodDto) {
    return 'This action adds a new period';
  }

  async findRepairs(rigId: string, repairType: PeriodType) {
    return await this.periodsRepo.findMany({
      where: {
        type: repairType,
        efficiency: { rigId },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} period`;
  }

  update(id: number, updatePeriodDto: UpdatePeriodDto) {
    return `This action updates a #${id} period`;
  }

  remove(id: number) {
    return `This action removes a #${id} period`;
  }
}
