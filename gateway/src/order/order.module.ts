import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AppGateway } from 'src/app.gateway';

@Module({
  providers: [OrderService, AppGateway],
  controllers: [OrderController]
})
export class OrderModule {}
