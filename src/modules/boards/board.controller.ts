import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../user/user.entity';
import type { BoardEntity } from './board.entity';
import { BoardService } from './board.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardController {
  // automatic init
  constructor(private boardService: BoardService) {}

  @Get('/')
  getAllBoards(@GetUser() user: UserEntity): Promise<BoardEntity[]> {
    return this.boardService.getAllBoards(user);
  }

  @Get('/:id')
  getBoard(@Param('id') id: string) {
    return this.boardService.getBoardByID(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: UserEntity
  ): Promise<BoardEntity> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ) {
    return this.boardService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string, @GetUser() user: UserEntity): Promise<void> {
    return this.boardService.deleteBoard(id, user);
  }
}
