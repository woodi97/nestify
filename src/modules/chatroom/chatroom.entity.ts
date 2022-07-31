import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity('chatroom')
export class ChatroomEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column({
    type: 'float8',
  })
  latitude: number;

  @Column({
    type: 'float8',
  })
  longitude: number;

  @OneToOne(() => UserEntity, (user) => user.chatroom, {
    createForeignKeyConstraints: false,
  })
  user: UserEntity;
}
