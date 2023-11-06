import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDeletionRequestDto } from './dto/create-deletion-request.dto';
import { UpdateDeletionRequestDto } from './dto/update-deletion-request.dto';
import { DeletionRequestRepository } from 'src/shared/database/repositories/deletionRequests.repositories';
import { RequestStatus } from './entities/deletion-request.entity';

@Injectable()
export class DeletionRequestsService {
  constructor(
    private readonly deletionRequestRepo: DeletionRequestRepository,
  ) {}

  async create(
    createDeletionRequestDto: CreateDeletionRequestDto,
    userId: string,
  ) {
    const existingRequests = await this.deletionRequestRepo.findMany({
      where: { efficiencyId: createDeletionRequestDto.efficiencyId },
    });

    const pendingRequestExists = existingRequests.some(
      (request) => request.status === RequestStatus.PENDING,
    );

    if (pendingRequestExists) {
      throw new ConflictException(
        'Já existe uma solicitação de exclusão pendente para este recurso.',
      );
    }

    return await this.deletionRequestRepo.create({
      data: { ...createDeletionRequestDto, userId },
    });
  }

  async findAll() {
    const requests = await this.deletionRequestRepo.findMany({
      select: {
        id: true,
        user: {
          select: {
            id: true,
            email: true,
            accessLevel: true,
          },
        },
        efficiency: {
          select: {
            id: true,
            rig: true,
            date: true,
          },
        },
        reason: true,
        status: true,
        createdAt: true,
      },
    });

    const pendingRequests = requests.filter(
      (request) => request.status === RequestStatus.PENDING,
    );

    return pendingRequests;
  }

  findOne(id: number) {
    return `This action returns a #${id} deletionRequest`;
  }

  async update(
    deletionRequestId: string,
    updateDeletionRequestDto: UpdateDeletionRequestDto,
  ) {
    return await this.deletionRequestRepo.update({
      where: { id: deletionRequestId },
      data: updateDeletionRequestDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} deletionRequest`;
  }
}
