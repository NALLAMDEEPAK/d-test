import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/interfaces/user.interface';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);