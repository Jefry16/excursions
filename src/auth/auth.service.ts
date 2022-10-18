import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHmac, randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { encode } from '../shared/jwt/jwt-econde';
import { currentTimeInSeconds } from '../shared/helpers/time-in-seconds.helper';
import { decode } from '../shared/jwt/jwt-decode';
import { UsersService } from '../users/users.service';
import { WhiteListService } from './white-list.service';
import { User } from 'src/users/user.entity';
import { ConfigService } from '@nestjs/config';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private whiteListService: WhiteListService,
    private configService: ConfigService,
  ) { }
  async signup(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user.length) {
      throw new BadRequestException('email already taken');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    return this.usersService.createUser(email, result);
  }

  async signin(userEmail: string, userPassword: string) {
    const [user] = await this.usersService.findByEmail(userEmail);
    if (!user) {
      throw new UnauthorizedException('bad credentials');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(userPassword, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException('bad credentials');
    }

    const tokens = this.createTokens(user);
    await this.whiteListService.saveTokenHash(tokens.refresh_token, tokens.e);
    return tokens;
  }

  async refreshToken(token: string) {
    const decodedToken = decode(
      token,
      this.configService.get<string>('JWT_KEY_REFRESH'),
    );
    if (decodedToken.exp < currentTimeInSeconds()) {
      throw new UnauthorizedException('refresh token has expired');
    }
    const user = await this.usersService.findOneById(decodedToken.sub);
    const hashedToken = createHmac(
      'SHA256',
      this.configService.get<string>('JWT_KEY_REFRESH'),
    )
      .update(token)
      .digest()
      .toString('base64url');
    await this.whiteListService.remove(hashedToken);
    const tokens = this.createTokens(user);
    await this.whiteListService.saveTokenHash(tokens.refresh_token, tokens.e);
    return tokens;
  }

  createTokens(user: User) {
    const nowInSeconds = new Date().getTime() / 1000;
    const access_token = encode(
      {
        sub: user.id,
        exp: Math.floor(
          Number(
            this.configService.get<string>('JWT_EXPIRY_TIME_ACCESS_TOKEN'),
          ) + nowInSeconds,
        ),
      },
      this.configService.get<string>('JWT_KEY_ACCESS'),
    );
    const refresh_token = encode(
      {
        sub: user.id,
        exp: Math.floor(
          Number(
            this.configService.get<string>('JWT_EXPIRY_TIME_REFRESH_TOKEN'),
          ) + nowInSeconds,
        ),
      },
      this.configService.get<string>('JWT_KEY_REFRESH'),
    );
    return {
      access_token,
      refresh_token,
      e: Math.floor(
        Number(
          this.configService.get<string>('JWT_EXPIRY_TIME_REFRESH_TOKEN'),
        ) + nowInSeconds,
      ),
    };
  }

  logout(token: string) {
    const encodedToken = createHmac(
      'SHA256',
      this.configService.get<string>('JWT_KEY_REFRESH'),
    )
      .update(token)
      .digest()
      .toString('base64url');
    return this.whiteListService.remove(encodedToken);
  }
}
//