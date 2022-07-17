import type { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'tnc101sesir',
  signOptions: {
    expiresIn: 60 * 60 * 24,
  },
};
