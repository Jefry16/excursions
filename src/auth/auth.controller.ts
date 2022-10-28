import { BadRequestException, Body, Controller, ForbiddenException, Get, Headers, Post, Req, Res } from '@nestjs/common';
import { TokenDto } from '../users/dtos/token.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import { decode } from '../shared/jwt/jwt-decode';
import { ConfigService } from '@nestjs/config';
import { currentTimeInSeconds } from '../shared/helpers/time-in-seconds.helper';
import { ApiTags } from '@nestjs/swagger';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService) { }

  @Post('signup')
  @Serialize(UserDto)
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    const authResponse = await this.authService.signin(body.email, body.password);
    response.cookie('rt', authResponse.refresh_token, { maxAge: authResponse.e, httpOnly: true })
    response.send({ token: authResponse.access_token })

  }

  @Post('authenticated')
  authenticated(@Headers() header: IncomingHttpHeaders) {
    if (!header.authorization) {
      throw new BadRequestException('no bearer token was sent');
    }
    const token = header.authorization.split(' ')[1]
    const decodedToken = decode(token, this.configService.get<string>('JWT_KEY_ACCESS'))

    if (decodedToken?.exp < currentTimeInSeconds()) {
      throw new ForbiddenException('access token has expired');
    }
    return {auth:'945454535453435455'}
  }


  @Post('refresh')
  async refresh(@Req() request: Request, @Res() response: Response) {
    const refreshToken = request?.cookies?.rt || ''
    const authResponse = await this.authService.refreshToken(refreshToken);
    response.cookie('rt', authResponse.refresh_token, { maxAge: authResponse.e, httpOnly: true })
    response.send({ token: authResponse.access_token })
  }

  @Post('logout')
  async logout(@Body() body: TokenDto) {
    return this.authService.logout(body.token);
  }
}
