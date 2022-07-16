import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import request from 'supertest';

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

  it('/ (GET)', () =>
    request(app.getHttpServer()).get('/').expect(200).expect('Welcome to Movie API Service'));

  describe('/movies', () => {
    it('GET', () => request(app.getHttpServer()).get('/movies').expect(200).expect([]));
    it('POST 201', () =>
      request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2020,
          genres: ['test'],
        })
        .expect(201));
    it('POST 400', () =>
      request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2020,
          genres: ['test'],
          // by forbidNonWhitelisted option it sends 400 error
          other: 'thing',
        })
        .expect(400));
    it('DELETE', () => request(app.getHttpServer()).delete('/movies').expect(404));
  });

  describe('/movies/:id', () => {
    it('GET 200', () => request(app.getHttpServer()).get('/movies/1').expect(200));
    it('GET 404', () => request(app.getHttpServer()).get('/movies/999').expect(404));
    it('PATCH', () =>
      request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'test',
          year: 2020,
          genres: ['teenage'],
        })
        .expect(200));
    it('DELETE', () => request(app.getHttpServer()).delete('/movies/1').expect(200));
  });
});
