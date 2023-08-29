import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRigDto } from './dto/create-rig.dto';

import { RigsRepository } from 'src/shared/database/repositories/rigs.repositories';

@Injectable()
export class RigsService {
  constructor(private readonly rigsRepo: RigsRepository) {}
  async create(createRigDto: CreateRigDto) {
    const { name, state, isActive } = createRigDto;

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
      },
    });
  }
}
