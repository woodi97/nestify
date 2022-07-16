import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { BoardsModule } from './modules/boards/boards.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.test.env' : '.env',
    }),
    // MongooseModule.forRoot(process.env.MONGO_URI as string, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    // }),
    AuthModule,
    BoardsModule,
  ],
})
export class AppModule {}
