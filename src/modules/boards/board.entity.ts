import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { UserEntity } from '../user/user.entity';
import { BoardStatus } from './board-status.enum';

@Entity('board')
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

  @ManyToOne(() => UserEntity, (user) => user.boards, { eager: false })
  user: UserEntity;
}
