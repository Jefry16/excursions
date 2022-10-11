import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { decode } from '../../shared/jwt/jwt-decode';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const bearerToken = request?.headers?.authorization;
    if (bearerToken) {
      const token = bearerToken.split(' ')[1];
      const tokenData = decode(token, '');
      const user = await this.userService.findOneById(tokenData?.id);
      request.currentUser = user;
    }
    return next.handle();
  }
}
