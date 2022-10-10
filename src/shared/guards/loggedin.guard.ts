import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { decode } from '../jwt/jwt-decode';
import { currentTimeInSeconds } from '../helpers/time-in-seconds.helper';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class LoggedinGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request?.headers?.authorization;
    if (!bearerToken) {
      throw new BadRequestException('no bearer token was sent');
    }
    const token = bearerToken.split(' ')[1];
    const decodedToken = decode(
      token,
      this.configService.get<string>('JWT_KEY_ACCESS'),
    );

    if (decodedToken.exp < currentTimeInSeconds()) {
      throw new UnauthorizedException('access token has expired');
    }
    return true;
  }
}