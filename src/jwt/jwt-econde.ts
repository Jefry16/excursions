import base64url from 'base64url';
import { createHmac } from 'crypto';

export function encode(payload: any, key: string) {
  const headerBase64Url = base64url(
    JSON.stringify({
      typ: 'JWT',
      alg: 'HS256',
    }),
  );
  const payloadBase64Url = base64url(JSON.stringify(payload));

  const signature = createHmac('SHA256', key)
    .update(`${headerBase64Url}.${payloadBase64Url}`)
    .digest()
    .toString('base64url');

  return `${headerBase64Url}.${payloadBase64Url}.${signature}`;
}
