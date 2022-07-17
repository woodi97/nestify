import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { BoardEntity } from './board.entity';
import { BoardRepository } from './board.repository';
import type { BoardStatus } from './board-status.enum';
import type { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(BoardRepository) private boardRepository: BoardRepository) {}

  getAllBoards(): Promise<BoardEntity[]> {
    const result = this.boardRepository.getAllBoards();

    return result;
  }

  getBoardByID(id: string): Promise<BoardEntity> {
    const result = this.boardRepository.getBoardByID(id);

    return result;
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  updateBoardStatus(id: string, status: BoardStatus): Promise<BoardEntity> {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  deleteBoard(id: string): Promise<BoardEntity> {
    return this.boardRepository.deleteBoard(id);
  }
}
