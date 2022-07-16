import { Module } from '@nestjs/common';

import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  exports: [MoviesService],
  providers: [MoviesService],
})
export class MoviesModule {}
