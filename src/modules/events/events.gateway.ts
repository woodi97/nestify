import { Logger } from '@nestjs/common';
import type {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { onlineMap } from './online-map';

@WebSocketGateway({ namespace: /\/ws-.+/ })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private static readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer() public server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { name: string; text: string }): void {
    this.server.emit('msgToClient', payload);
  }

  afterInit() {
    EventsGateway.logger.debug('Socket Server Init Complete');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    EventsGateway.logger.debug('Client connected', socket.nsp.name);

    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }

    socket.emit('message', socket.nsp.name);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    EventsGateway.logger.debug('Client disconnected');
    const newNamespace = socket.nsp;
    delete onlineMap[socket.nsp.name][socket.id];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    newNamespace.emit('onlineList', Object.values(onlineMap[socket.nsp.name]));
  }
}
