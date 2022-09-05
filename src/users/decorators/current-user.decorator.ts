import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { decode } from '../../jwt/jwt-decode';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;
    if (!bearerToken) {
      throw new BadRequestException('no bearer token was sent');
    }
    const token = bearerToken.split(' ')[1];

    return decode(token, '');
  },
);
