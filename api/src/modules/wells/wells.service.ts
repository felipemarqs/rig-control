import { Injectable } from '@nestjs/common';
import { CreateWellDto } from './dto/create-well.dto';
import { UpdateWellDto } from './dto/update-well.dto';
import { WellsRepository } from 'src/shared/database/repositories/well.repositories';

@Injectable()
export class WellsService {
  constructor(private readonly wellsRepo: WellsRepository) {}

  create(createWellDto: CreateWellDto) {
    return this.wellsRepo.create({ data: createWellDto });
  }

  createMany(createWellDto: CreateWellDto) {
    return this.wellsRepo.create({ data: createWellDto });
  }

  findAll() {
    return `This action returns all wells`;
  }

  findOne(id: number) {
    return `This action returns a #${id} well`;
  }

  update(id: number, updateWellDto: UpdateWellDto) {
    return `This action updates a #${id} well`;
  }

  remove(id: number) {
    return `This action removes a #${id} well`;
  }
}
