import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { AccessLevel } from 'src/modules/auth/entities/AccessLevel';

export const IsUserAdm = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const role = request.role;
    if (!role) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    if (role === AccessLevel.ADM) {
      return true;
    }
    return false;
  },
);
