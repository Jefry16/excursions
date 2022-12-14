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
  constructor(
    private userService: UsersService,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { url } = request || '/';

    if (url.split('/')[1] === 'auth') {
      return next.handle();
    }
    const bearerToken = request?.headers?.authorization;
    if (bearerToken) {
      const token = bearerToken.split(' ')[1];
      const tokenData = decode(
        token,
        process.env.JWT_KEY_ACCESS
      );
      const user = await this.userService.findOneById(tokenData?.sub);
      request.currentUser = user;
    }
    return next.handle();
  }
}
