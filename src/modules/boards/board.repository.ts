import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import type { UserEntity } from '../user/user.entity';
import { BoardEntity } from './board.entity';
import type { BoardStatus } from './board-status.enum';
import type { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(BoardEntity)
export class BoardRepository extends Repository<BoardEntity> {
  async getAllBoards(user: UserEntity): Promise<BoardEntity[]> {
    const query = this.createQueryBuilder('board');

    query.where('board.user.id = :userId', { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  async getBoardByID(id: string): Promise<BoardEntity> {
    const found = await this.findOne({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: UserEntity,
  ): Promise<BoardEntity> {
    const newBoard: BoardEntity = this.create({
      ...createBoardDto,
      user,
    });

    await this.save(newBoard);

    return newBoard;
  }

  async updateBoardStatus(
    id: string,
    status: BoardStatus,
  ): Promise<BoardEntity> {
    const board = await this.getBoardByID(id);
    board.status = status;

    await this.save(board);

    return board;
  }

  async deleteBoard(id: string, user: UserEntity): Promise<void> {
    const result = await this.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }
}
