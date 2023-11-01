import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItem } from "./orderItem.entity";
import { OrderItemController } from "./orderItem.controller";
import { OrderItemService } from "./orderItem.service";

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem])],
    controllers: [OrderItemController],
    providers: [OrderItemService]
})
export class OrderItemModule {}