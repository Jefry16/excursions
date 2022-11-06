import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHmac } from 'crypto';
import { WhiteList } from './whitelist-token.entity';

@Injectable()
export class WhiteListService {
  constructor(
    @InjectRepository(WhiteList) private repo: Repository<WhiteList>,
  ) { }

  saveTokenHash(token: string, expires_at: number) {
    const token_hash = createHmac(
      'SHA256',
      process.env.JWT_KEY_REFRESH
    )
      .update(token)
      .digest()
      .toString('base64url');
    const user = this.repo.create({ token_hash, expires_at });
    return this.repo.save(user);
  }

  async remove(token_hash: string) {
    const token = await this.repo.findOneBy({ token_hash });
    const tokenCopy = { ...token }
    if (!token) {
      throw new BadRequestException(
        'the provided token was not on the whitelist',
      );
    }
    await this.repo.remove(token);
    return tokenCopy;
  }
}
