import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, accessLevel, rigId } = createUserDto;

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        accessLevel,
        password,
      },
    });

    if (rigId) {
      await this.prismaService.userRig.create({
        data: {
          userId: user.id,
          rigId,
        },
      });
    }

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
