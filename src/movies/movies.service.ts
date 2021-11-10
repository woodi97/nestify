import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { IMovie } from './entities/movie.entity';

// Dependency Injection Decorator
@Injectable()
export class MoviesService {
  private movies: IMovie[] = [];

  getAll(): IMovie[] {
    return this.movies;
  }

  getOne(id: number): IMovie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} Not Found`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies.filter((movie) => movie.id !== id);
  }

  create(movie: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movie,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
