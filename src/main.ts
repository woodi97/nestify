import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import compression from 'compression';
import { middleware as expressCtx } from 'express-ctx';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

export async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: true,
    },
  );

  app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.use(helmet());
  app.setGlobalPrefix(process.env.API_PREFIX ?? '/api');
  app.use(
    RateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(compression());
  app.use(morgan('combined'));
  app.enableVersioning();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  const configService = app.select(SharedModule).get(ApiConfigService);

  if (configService.documentationEnabled) {
    setupSwagger(app);
  }

  app.use(expressCtx);

  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }

  app.useWebSocketAdapter(new IoAdapter(app));

  const port = configService.appConfig.port;
  await app.listen(port);
  console.info(`server running on ${await app.getUrl()}`);

  return app;
}

void bootstrap();
