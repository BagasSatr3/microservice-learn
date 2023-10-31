import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [ProductModule, OrderModule, OrderItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
