import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    console.log(user);

    if (!user) {
      throw new NotFoundException(
        'Usuário não encontrado no request. Necessário usar o decorator AuthGuard',
      );
    }

    if (data) {
      return user[data];
    }

    return user;
  },
);
