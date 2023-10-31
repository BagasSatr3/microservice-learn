// gateway.gateway.ts
import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3022)
export class AppGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    this.server.emit('message', payload);
  }
}
