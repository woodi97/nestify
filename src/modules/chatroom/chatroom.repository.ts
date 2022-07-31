import { ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';

import type { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { ChatroomEntity } from './chatroom.entity';
import type { CreateChatroomDto } from './dto/create-chatroom.dto';
import type { ChatroomResultType } from './type/chatroom-result.type';

@EntityRepository(ChatroomEntity)
export class ChatroomRepository extends Repository<ChatroomEntity> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super();
  }

  async getMyChatroom(user: UserEntity): Promise<ChatroomResultType> {
    // Todo: check current user's location & if it is too far from current chatroom
    const chatroom = await this.findOne({
      relations: ['user'],
      where: {
        user: {
          id: user.id,
        },
      },
    });

    if (!chatroom) {
      throw new ForbiddenException('User does not has a chatroom');
    }

    return {
      id: chatroom.id,
      name: chatroom.name,
      title: chatroom.title,
      latitude: chatroom.latitude,
      longitude: chatroom.longitude,
    };
  }

  async createChatroom(
    createChatroomDto: CreateChatroomDto,
    user: UserEntity,
  ): Promise<ChatroomResultType> {
    // check if user is already has a chatroom
    const chatroom = await this.find({
      relations: ['user'],
      where: {
        user: {
          id: user.id,
        },
      },
    });

    // if user has a chatroom, throw error
    if (chatroom.length > 0) {
      throw new ForbiddenException('User is already has a chatroom');
    }

    const newChatroom: ChatroomEntity = this.create({
      ...createChatroomDto,
      user,
    });

    await this.save(newChatroom);

    return {
      id: newChatroom.id,
      name: newChatroom.name,
      title: newChatroom.title,
      latitude: newChatroom.latitude,
      longitude: newChatroom.longitude,
    };
  }

  async deleteChatroom(user: UserEntity): Promise<void> {
    if (!user.chatroom) {
      throw new ForbiddenException('User does not has a chatroom');
    }

    await this.delete(user.chatroom.id);

    // Todo: should we delete chatroom_id on user entity?
  }
}
