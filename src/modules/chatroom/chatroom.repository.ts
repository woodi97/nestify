import { EntityRepository, Repository } from 'typeorm';

import { ChatroomEntity } from './chatroom.entity';

@EntityRepository(ChatroomEntity)
export class ChatroomRepository extends Repository<ChatroomEntity> {}
