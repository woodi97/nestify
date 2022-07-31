import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../user/user.entity';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';

@Controller('chatroom')
@ApiTags('chatroom')
@UseGuards(AuthGuard())
export class ChatroomController {
  constructor(private chatRoomService: ChatroomService) {}

  @Get()
  @ApiOkResponse()
  getNearRooms() {
    return 'This action returns all near rooms';
  }

  @Get('/my-room')
  @ApiOkResponse()
  getMyRooms(@GetUser() user: UserEntity) {
    return this.chatRoomService.getMyChatroom(user);
  }

  @Get('/:id')
  @ApiOkResponse()
  getRoomByID() {
    return 'This action returns a room by id';
  }

  @Get('/:id/messages')
  @ApiOkResponse()
  getRoomMessages() {
    return 'This action returns all messages for a specific room';
  }

  @Post()
  @ApiOkResponse()
  @UsePipes(ValidationPipe)
  createRoom(
    @Body() createChatroomDto: CreateChatroomDto,
    @GetUser() user: UserEntity,
  ) {
    return this.chatRoomService.createChatroom(createChatroomDto, user);
  }

  @Delete()
  @ApiOkResponse()
  deleteRoom(@GetUser() user: UserEntity) {
    return this.chatRoomService.deleteChatroom(user);
  }
}
