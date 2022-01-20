import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.test.env' : '.env',
    }),
  ],
})
export class AppModule {}
