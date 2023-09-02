import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEfficiencyDto } from './dto/create-efficiency.dto';
import { UpdateEfficiencyDto } from './dto/update-efficiency.dto';
import { EfficienciesRepository } from 'src/shared/database/repositories/efficiencies.repositories';
import { UsersRigRepository } from 'src/shared/database/repositories/usersRig.repositories';
import { isAfter, isBefore } from 'date-fns';
import { RigsRepository } from 'src/shared/database/repositories/rigs.repositories';

@Injectable()
export class EfficienciesService {
  constructor(
    private readonly efficiencyRepo: EfficienciesRepository,
    private readonly userRigsRepo: UsersRigRepository,
    private readonly rigsRepo: RigsRepository,
  ) {}

  private isTimeValid(startHour: string, endHour: string): boolean {
    const startTime = new Date(startHour);
    const endTime = new Date(endHour);
    return isBefore(startTime, endTime);
  }

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

    for (let i = 0; i < periods.length; i++) {
      const currentPeriod = periods[i];

      if (i > 0) {
        const previousPeriod = periods[i - 1];
        if (
          isAfter(
            new Date(currentPeriod.startHour),
            new Date(previousPeriod.endHour),
          )
        ) {
          throw new ConflictException(
            'Horários de período se sobrepõem ou são inválidos.',
          );
        }
      }

      if (!this.isTimeValid(currentPeriod.startHour, currentPeriod.endHour)) {
        throw new ConflictException(
          'Horário inválido. A hora de início deve ser antes da hora final.',
        );
      }
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

  async findAllByRigId(filters: {
    rigId: string;
    startDate: string;
    endDate: string;
  }) {
    const rigExists = await this.rigsRepo.findUnique({
      where: {
        id: filters.rigId,
      },
    });

    if (!rigExists) {
      throw new NotFoundException('Sonda não encontrada');
    }
    const efficiencies = await this.efficiencyRepo.findMany({
      where: {
        rigId: filters.rigId,
        date: {
          gte: new Date(filters.startDate),
          lte: new Date(filters.endDate),
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    return efficiencies;
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
