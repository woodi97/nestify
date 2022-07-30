import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { BoardEntity } from '../boards/board.entity';

@Entity('user')
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => BoardEntity, (board) => board.user, { eager: true })
  boards: BoardEntity[];
}
