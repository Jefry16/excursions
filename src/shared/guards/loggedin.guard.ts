import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { decode } from '../jwt/jwt-decode';
import { currentTimeInSeconds } from '../helpers/time-in-seconds.helper';
import { UnauthorizedException } from '@nestjs/common';

export class LoggedinGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request?.headers?.authorization;
    if (!bearerToken) {
      throw new BadRequestException('no bearer token was sent');
    }
    const token = bearerToken.split(' ')[1];
    const decodedToken = decode(token, process.env.JWT_KEY);

    if (decodedToken.exp < currentTimeInSeconds()) {
      throw new UnauthorizedException('access token has expired');
    }
    return true;
  }
}
