import { Injectable, NotFoundException } from '@nestjs/common';

import type { CreateMovieDto } from './dto/create-movie.dto';
import type { UpdateMovieDto } from './dto/update-movie.dto';
import type { IMovie } from './entities/movie.entity';

// Dependency Injection Decorator
@Injectable()
export class MoviesService {
  private movies: IMovie[] = [];

  getAll(): IMovie[] {
    return this.movies;
  }

  getOne(id: number): IMovie {
    const movie = this.movies.find((mov) => mov.id === id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} Not Found`);
    }

    return movie;
  }

  create(movie: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movie,
    });

    return this.movies[this.movies.length - 1];
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });

    return true;
  }
}
