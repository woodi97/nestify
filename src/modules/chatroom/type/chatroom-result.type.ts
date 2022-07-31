import type { ChatroomEntity } from '../chatroom.entity';

export type ChatroomResultType = Pick<
  ChatroomEntity,
  'id' | 'name' | 'title' | 'latitude' | 'longitude'
>;
