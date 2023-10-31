import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { AppGateway } from 'src/app.gateway';

@Module({
  providers: [OrderItemService, AppGateway],
  controllers: [OrderItemController]
})
export class OrderItemModule {}
