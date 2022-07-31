import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Location } from './atoms/location.schema';

export type ChatroomDocument = Chatroom & Document;

@Schema()
export class Chatroom {
  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true, type: Location })
  location: Location;
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);
