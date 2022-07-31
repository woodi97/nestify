import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Chatroom,
  ChatroomSchema,
} from '../../database/schemas/chatroom.schema';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from '../user/user.repository';
import { ChatroomController } from './chatroom.controller';
import { ChatroomRepository } from './chatroom.repository';
import { ChatroomService } from './chatroom.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatroomRepository, UserRepository]),
    MongooseModule.forFeature([
      { name: Chatroom.name, schema: ChatroomSchema },
    ]),
    AuthModule,
  ],
  providers: [ChatroomService],
  controllers: [ChatroomController],
})
export class ChatroomModule {}
