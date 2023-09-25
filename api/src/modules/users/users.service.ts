import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getUserById(userId: string) {
    const user = await this.usersRepo.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        accessLevel: true,
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
}
