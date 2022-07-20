import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  return req.user;
});
