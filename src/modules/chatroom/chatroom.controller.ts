import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ChatroomService } from './chatroom.service';

@Controller('chatroom')
@ApiTags('chatroom')
@UseGuards(AuthGuard())
export class ChatroomController {
  constructor(private chatRoomService: ChatroomService) {}

  @Get()
  @ApiOkResponse()
  getRooms() {
    return 'This action returns all rooms';
  }

  @Get('/:id')
  @ApiOkResponse()
  getRoom() {
    return 'This action returns a specific room';
  }

  @Get('/:id/messages')
  @ApiOkResponse()
  getRoomMessages() {
    return 'This action returns all messages for a specific room';
  }
}
