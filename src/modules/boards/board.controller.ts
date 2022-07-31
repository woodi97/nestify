import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../user/user.entity';
import { BoardEntity } from './board.entity';
import { BoardService } from './board.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@ApiTags('boards')
@UseGuards(AuthGuard())
export class BoardController {
  // automatic init
  constructor(private boardService: BoardService) {}

  @Get('/')
  @ApiOkResponse({ type: BoardEntity })
  getAllBoards(@GetUser() user: UserEntity): Promise<BoardEntity[]> {
    return this.boardService.getAllBoards(user);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BoardEntity })
  getBoard(@Param('id') id: string): Promise<BoardEntity> {
    return this.boardService.getBoardByID(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: CreateBoardDto })
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: UserEntity,
  ): Promise<BoardEntity> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  @Patch('/:id/status')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({ type: BoardEntity })
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  deleteBoard(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.boardService.deleteBoard(id, user);
  }
}
