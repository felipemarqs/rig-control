import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (_data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;
    const path = request.path;

    if (!userId) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }
    return userId;
  },
);
