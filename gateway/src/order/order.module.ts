import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AppGateway } from 'src/app.gateway';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';

@Module({
  providers: [OrderService, AppGateway, RedisCacheService],
  controllers: [OrderController]
})
export class OrderModule {}
