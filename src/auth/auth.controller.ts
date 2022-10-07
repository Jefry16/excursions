import { Body, Controller, Post } from '@nestjs/common';
import { TokenDto } from '../users/dtos/token.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @Serialize(UserDto)
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('signin')
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Post('refresh')
  async refresh(@Body() body: TokenDto) {
    return this.authService.refreshToken(body.token);
  }

  @Post('logout')
  async logout(@Body() body: TokenDto) {
    return this.authService.logout(body.token);
  }
}
