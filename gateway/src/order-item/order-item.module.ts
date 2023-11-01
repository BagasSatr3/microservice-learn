import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { AppGateway } from 'src/app.gateway';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';

@Module({
  providers: [OrderItemService, AppGateway, RedisCacheService, ProductService, OrderService],
  controllers: [OrderItemController]
})
export class OrderItemModule {}
