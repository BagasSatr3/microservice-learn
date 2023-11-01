import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [ProductModule, OrderModule, OrderItemModule, RedisCacheModule, AppGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
