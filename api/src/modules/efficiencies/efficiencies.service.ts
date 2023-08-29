import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEfficiencyDto } from './dto/create-efficiency.dto';
import { UpdateEfficiencyDto } from './dto/update-efficiency.dto';
import { EfficienciesRepository } from 'src/shared/database/repositories/efficiencies.repositories';
import { UsersRigRepository } from 'src/shared/database/repositories/usersRig.repositories';

@Injectable()
export class EfficienciesService {
  constructor(
    private readonly efficiencyRepo: EfficienciesRepository,
    private readonly userRigsRepo: UsersRigRepository,
  ) {}

  async create(createEfficiencyDto: CreateEfficiencyDto, userId: string) {
    const { rigId, date, availableHours, periods, fluidRatio, equipmentRatio } =
      createEfficiencyDto;

    const rigBelongsToUser = await this.userRigsRepo.findFirst({
      where: { userId, rigId },
    });

    if (!rigBelongsToUser) {
      throw new UnauthorizedException(
        'O usuário não é vinculado a sonda selecionada!',
      );
    }

    const efficiencyAlreadyExists = await this.efficiencyRepo.findFirst({
      where: { rigId, date },
    });

    if (efficiencyAlreadyExists) {
      throw new ConflictException('Data já preenchida!');
    }

    const efficiencyData = {
      date,
      availableHours,
      rigId,
      userId,
      periods: {
        createMany: {
          data: periods,
        },
      },
    };

    if (equipmentRatio?.length > 0) {
      efficiencyData['equipmentRatio'] = {
        createMany: {
          data: equipmentRatio,
        },
      };
    }

    if (fluidRatio?.length > 0) {
      efficiencyData['fluidRatio'] = {
        createMany: {
          data: fluidRatio,
        },
      };
    }

    const efficiency = await this.efficiencyRepo.create({
      data: efficiencyData,
    });

    return efficiency;
  }

  findAll() {
    return `This action returns all efficiencies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} efficiency`;
  }

  update(id: number, updateEfficiencyDto: UpdateEfficiencyDto) {
    return `This action updates a #${id} efficiency`;
  }

  async remove(efficiencyId: string) {
    await this.efficiencyRepo.delete({ where: { id: efficiencyId } });
    return null;
  }
}
