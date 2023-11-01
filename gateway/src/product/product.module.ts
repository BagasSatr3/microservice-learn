import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AppGateway } from 'src/app.gateway';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { OrderService } from 'src/order/order.service';

@Module({
  providers: [ProductService, AppGateway, RedisCacheService, OrderService],
  controllers: [ProductController],
})
export class ProductModule {}
