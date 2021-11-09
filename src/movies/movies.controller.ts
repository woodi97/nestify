import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

interface IMovieData {
  title: string;
  director: string;
}

// Controller는 basic router
@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `This will search for a movie with the title: ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieID: string) {
    return `This will return one movie with the id: ${movieID}`;
  }

  @Post()
  create(@Body() movieData: IMovieData) {
    console.log(movieData);
    return 'This will create a new movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieID: string) {
    return `This will delete a movie with the id: ${movieID}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieID: string, @Body() updateData) {
    return {
      updatedMovie: movieID,
      ...updateData,
    };
  }
}
