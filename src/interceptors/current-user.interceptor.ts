import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { decode } from '../shared/jwt/jwt-decode';
import { UsersService } from '../users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    console.log(4);

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
