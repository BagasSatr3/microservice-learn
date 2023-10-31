import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dtos/create-orderItem.dto';
import { AppGateway } from 'src/app.gateway';

@Controller('orderItems')
export class OrderItemController {
    constructor(
        private readonly orderItemService: OrderItemService,
        private readonly appGateway: AppGateway,
    ) {}

    @Get()
    async getAllOrderItems() {
        const orderItem = this.orderItemService.getOrderItemAll()
        this.appGateway.handleMessage(null, orderItem);
        return orderItem
    }

    @Get(':orderItemId')
    async getOrderItem(@Param('orderItemId') orderItemId: any) {
        const orderItem = this.orderItemService.getOrderItemById(orderItemId)
        this.appGateway.handleMessage(null, orderItem);
        return orderItem
    }

    @Post()
    async createOrderItem(@Body() dto: CreateOrderItemDto) {
        const orderItem = this.orderItemService.createOrderItem(dto)
        this.appGateway.handleMessage(null, orderItem);
        return orderItem
    }

    @Patch(':orderItemId')
    async updateOrderItem(@Param('orderItemId') orderItemId: any, dto: CreateOrderItemDto) {
        const orderItem = this.orderItemService.updateOrderItem(orderItemId, dto)
        this.appGateway.handleMessage(null, orderItem);
        return orderItem
    }

    @Delete(':orderItemId') 
        async deleteOrderItem(@Param('orderItemId') orderItemId: any) {
            this.orderItemService.deleteOrderItem(orderItemId)
            this.appGateway.handleMessage(null, `Deleted Order Item with ID ${orderItemId}`)
        }
    
}
