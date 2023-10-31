import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AppGateway } from 'src/app.gateway';

@Module({
  providers: [ProductService, AppGateway],
  controllers: [ProductController],
})
export class ProductModule {}
