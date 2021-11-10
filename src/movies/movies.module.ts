import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  // NestJs Automatically Inject provider to controller
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
