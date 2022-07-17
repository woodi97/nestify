import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { typeOrmConfig } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BoardsModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
