import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { UserEntity } from '../user/user.entity';
import type { BoardEntity } from './board.entity';
import { BoardRepository } from './board.repository';
import type { BoardStatus } from './board-status.enum';
import type { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  getAllBoards(user: UserEntity): Promise<BoardEntity[]> {
    return this.boardRepository.getAllBoards(user);
  }

  getBoardByID(id: string): Promise<BoardEntity> {
    return this.boardRepository.getBoardByID(id);
  }

  createBoard(
    createBoardDto: CreateBoardDto,
    user: UserEntity,
  ): Promise<BoardEntity> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  updateBoardStatus(id: string, status: BoardStatus): Promise<BoardEntity> {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  deleteBoard(id: string, user: UserEntity): Promise<void> {
    return this.boardRepository.deleteBoard(id, user);
  }
}
