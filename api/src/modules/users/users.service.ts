import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ContractRepository } from 'src/shared/database/repositories/contract.repositories';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly contractsRepo: ContractRepository,
  ) {}

  async getUserById(userId: string) {
    const user = await this.usersRepo.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        accessLevel: true,
        userLog: {
          select: {
            loginTime: true,
          },
          take: 1,
        },
        rigs: {
          select: {
            rig: {
              select: {
                id: true,
                name: true,
                state: true,
                isActive: true,
                contract: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    return user;
  }

  async findAll(filters: { contractId?: string }) {
    let whereClause = {};

    if (filters.contractId) {
      const contractExists = await this.contractsRepo.findUnique({
        where: { id: filters.contractId },
      });

      if (!contractExists) {
        throw new NotFoundException('Contrato não encontrado');
      }

      whereClause = {
        contract: {
          some: {
            contractId: filters.contractId,
          },
        },
      };
    }

    const users = await this.usersRepo.findAll({
      select: {
        id: true,
        name: true,
        userLog: {
          select: {
            loginTime: true,
          },
          take: 1,
          orderBy: {
            loginTime: 'desc',
          },
        },
        contracts: {
          select: {
            contract: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        rigs: {
          select: {
            rig: {
              select: {
                id: true,
                name: true,
                state: true,
                isActive: true,
                contract: true,
              },
            },
          },
        },
        accessLevel: true,
        email: true,
      },
      orderBy: { name: 'asc' },
      where: whereClause,
    });

    return users;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { name, email, password, accessLevel } = updateUserDto;
    const hashedPassword = await hash(password, 10);

    return this.usersRepo.update({
      where: { id: userId },
      data: { name, email, password: hashedPassword, accessLevel },
    });
  }
}
