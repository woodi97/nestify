import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        forbidUnknownValues: true,
        // if non-meaning parameters reaches, just ignore it
        whitelist: true,
        // if non-meaning parameters reaches, raising error
        forbidNonWhitelisted: true,
        // automatically transform to actual type(Ex: string -> number)
        transform: true,
      }),
    );
    await app.init();
  });
});
