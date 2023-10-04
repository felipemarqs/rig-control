import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { UsersRigRepository } from 'src/shared/database/repositories/usersRig.repositories';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { RigsRepository } from 'src/shared/database/repositories/rigs.repositories';
import { ContractRepository } from 'src/shared/database/repositories/contract.repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly usersRigRepo: UsersRigRepository,
    private readonly jwtService: JwtService,
    private readonly rigsRepo: RigsRepository,
    private readonly contractRepo: ContractRepository,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signup(signUpDto: SignupDto) {
    const { name, email, password, accessLevel, rigId, contractId } = signUpDto;

    const isEmailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (isEmailTaken) {
      throw new ConflictException('Email já cadastrado!');
    }

    if (rigId) {
      const rigExists = await this.rigsRepo.findUnique({
        where: { id: rigId },
      });

      if (!rigExists) {
        throw new ConflictException('Sonda não encontrada!');
      }
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

    const accessToken = await this.generateAccessToken(user.id);

    return {
      accessToken,
    };
  }

  private async generateAccessToken(userId: string) {
    return await this.jwtService.signAsync({ sub: userId });
  }
}
