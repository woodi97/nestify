import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { v1 as uuid } from 'uuid';

import { BoardEntity } from './board.entity';
import { BoardStatus } from './board-status.enum';
import type { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(BoardEntity)
export class BoardRepository extends Repository<BoardEntity> {
  async getAllBoards(): Promise<BoardEntity[]> {
    return this.find();
  }

  async getBoardByID(id: string): Promise<BoardEntity> {
    const found = await this.findOne({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    const newBoard: BoardEntity = this.create({
      id: uuid(),
      ...createBoardDto,
      status: BoardStatus.PUBLIC,
    });

    await this.save(newBoard);

    return newBoard;
  }

  async updateBoardStatus(id: string, status: BoardStatus): Promise<BoardEntity> {
    const board = await this.getBoardByID(id);
    board.status = status;

    await this.save(board);

    return board;
  }

  async deleteBoard(id: string): Promise<BoardEntity> {
    const board = await this.getBoardByID(id);
    await this.remove(board);

    return board;
  }
}
