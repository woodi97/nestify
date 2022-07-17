import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BoardStatus } from './board-status.enum';

@Entity('boards')
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: BoardStatus,
    default: BoardStatus.PUBLIC,
  })
  status: BoardStatus;
}
