import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import type { BoardEntity } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  // automatic init
  constructor(private boardService: BoardsService) {}

  @Get('/')
  getAllBoards(): Promise<BoardEntity[]> {
    return this.boardService.getAllBoards();
  }

  @Get('/:id')
  getBoard(@Param('id') id: string) {
    return this.boardService.getBoardByID(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    return this.boardService.createBoard(createBoardDto);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string) {
    return this.boardService.deleteBoard(id);
  }
}
