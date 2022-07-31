import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';

import type { ChatroomDocument } from '../../database/schemas/chatroom.schema';
import { Chatroom } from '../../database/schemas/chatroom.schema';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../user/user.entity';
import { ChatroomRepository } from './chatroom.repository';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import type { ChatroomResultType } from './type/chatroom-result.type';

@Injectable()
export class ChatroomService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    @InjectModel(Chatroom.name)
    private readonly chatroomModel: Model<ChatroomDocument>,
    @InjectRepository(ChatroomRepository)
    private chatroomRepository: ChatroomRepository,
  ) {}

  async getMyChatroom(user: UserEntity): Promise<ChatroomResultType> {
    return this.chatroomRepository.getMyChatroom(user);
  }

  async createChatroom(
    @Body() createChatroomDto: CreateChatroomDto,
    @GetUser() user: UserEntity,
  ): Promise<ChatroomResultType> {
    const mainDBChatroom = await this.chatroomRepository.createChatroom(
      createChatroomDto,
      user,
    );

    // Todo: save to mongoDB

    return mainDBChatroom;
  }

  async deleteChatroom(user: UserEntity): Promise<void> {
    await this.chatroomRepository.deleteChatroom(user);
  }
}
