import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';
import { encode } from '../shared/jwt/jwt-econde';
import { currentTimeInSeconds } from '../shared/helpers/time-in-seconds.helper';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('email already taken');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    return this.usersService.createUser(email, result);
  }

  async signin(userEmail: string, userPassword: string) {
    const user = await this.usersService.findByEmail(userEmail);
    if (!user) {
      throw new UnauthorizedException('bad credentials');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(userPassword, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException('bad credentials');
    }
    const nowInSeconds = currentTimeInSeconds();
    const access_token = encode(
      {
        sub: user.id,
        exp: Math.floor(
          Number(process.env.JWT_EXPIRY_TIME_ACCESS_TOKEN) + nowInSeconds,
        ),
      },
      process.env.JWT_KEY,
    );
    const refresh_token = encode(
      {
        sub: user.id,
        exp: Math.floor(
          Number(process.env.JWT_EXPIRY_TIME_REFRESH_TOKEN) + nowInSeconds,
        ),
      },
      process.env.JWT_KEY,
    );

    return { access_token, refresh_token };
  }
}
