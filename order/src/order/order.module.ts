import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { AppGateway } from "src/app.gateway";

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    controllers: [OrderController],
    providers: [OrderService, AppGateway]
})
export class OrderModule {}