import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './interface/board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardByID(id: string) {
    const result = this.boards.find((board) => board.id === id);
    if (!result) {
      throw new NotFoundException(`Can't find Board with id${id}`);
    }
    return result;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const board: Board = {
      id: uuid(),
      ...createBoardDto,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardByID(id);
    board.status = status;
    return board;
  }

  deleteBoard(id: string) {
    const result = this.getBoardByID(id);
    this.boards = this.boards.filter((board) => board.id !== result.id);
  }
}
