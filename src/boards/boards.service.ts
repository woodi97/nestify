import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import type { CreateBoardDto } from './dto/create-board.dto';
import type { IBoard } from './interface/boards.model';
import { BoardStatus } from './interface/boards.model';

@Injectable()
export class BoardsService {
  private boards: IBoard[] = [];

  getAllBoards(): IBoard[] {
    return this.boards;
  }

  getBoardByID(id: string): IBoard {
    const result = this.boards.find((board) => board.id === id);

    if (!result) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return result;
  }

  createBoard(createBoardDto: CreateBoardDto): IBoard {
    const board: IBoard = {
      id: uuid(),
      ...createBoardDto,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);

    return board;
  }

  updateBoardStatus(id: string, status: BoardStatus): IBoard {
    const board = this.getBoardByID(id);
    board.status = status;

    return board;
  }

  deleteBoard(id: string): IBoard {
    const result = this.getBoardByID(id);
    this.boards = this.boards.filter((board) => board.id !== result.id);

    return result;
  }
}
