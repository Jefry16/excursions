import { UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'crypto';

export function decode(token: string, key: string) {
  const matches = token.match(
    /^(?<header>.+)\.(?<payload>.+)\.(?<signature>.+)$/,
  );
  if (matches === null) {
    throw new UnauthorizedException('invalid token format');
  }
  const { header, payload, signature } = matches['groups'];
  const hashedSignatured = createHmac('SHA256', key)
    .update(`${header}.${payload}`)
    .digest()
    .toString('base64url');

  if (hashedSignatured !== signature) {
    throw new UnauthorizedException('signature does not match');
  }
  const decodedPayload = JSON.parse(
    Buffer.from(payload, 'base64').toString('utf8'),
  );
  return decodedPayload;
}
