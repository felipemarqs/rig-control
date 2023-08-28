import { Injectable } from '@nestjs/common';
import { CreateRigDto } from './dto/create-rig.dto';
import { UpdateRigDto } from './dto/update-rig.dto';
import { RigsRepository } from 'src/shared/database/repositories/rigs.repositories';

@Injectable()
export class RigsService {
  constructor(private readonly rigsRepo: RigsRepository) {}
  create(createRigDto: CreateRigDto) {
    const { name, state } = createRigDto;
    return this.rigsRepo.create({
      data: {
        name,
        state,
      },
    });
  }

  findAll() {
    return `This action returns all rigs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rig`;
  }

  update(id: number, updateRigDto: UpdateRigDto) {
    return `This action updates a #${id} rig`;
  }

  remove(id: number) {
    return `This action removes a #${id} rig`;
  }
}
