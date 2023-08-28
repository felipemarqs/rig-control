import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { UsersRigRepository } from 'src/shared/database/repositories/usersRig.repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly usersRigRepo: UsersRigRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, accessLevel, rigId } = createUserDto;

    const isEmailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (isEmailTaken) {
      throw new ConflictException('Email já cadastrado!');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        accessLevel,
        password: hashedPassword,
      },
    });

    if (rigId) {
      await this.usersRigRepo.create({
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
