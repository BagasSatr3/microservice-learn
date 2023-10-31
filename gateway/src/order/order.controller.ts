import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AppGateway } from 'src/app.gateway';

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly appGateway: AppGateway,
    ) {}

    @Get()
    async getAllOrders() {
        const order = this.orderService.getOrderAll()
        this.appGateway.handleMessage(null, order);
        return order
    }

    @Get(":orderId")
    async getOrder(@Param('orderId') orderId: any) {
        const order = this.orderService.getOrderById(orderId)
        this.appGateway.handleMessage(null, order);
        return order
    }
    
    @Post() 
    async createOrder(@Body() dto: CreateOrderDto) {
        const order = this.orderService.createOrder(dto)
        this.appGateway.handleMessage(null, order);
        return order
    }
    
    @Patch(":orderId") 
    async updateOrder(@Param('orderId') orderId: any, @Body() dto: CreateOrderDto) {
        const order = this.orderService.updateOrder(orderId, dto)
        this.appGateway.handleMessage(null, order);
        return order
    }
    
    @Delete(":orderId")
    async deleteOrder(@Param('orderId') orderId: any) {
        this.orderService.deleteOrder(orderId)
        this.appGateway.handleMessage(null, `Deleted Order with ID ${orderId}`);
    }

    @Get(":orderId/orderItems")
    async getOrderItemWithProduct(@Param('orderId') orderId: any) {
        const order = this.orderService.getOrderItemWithProduct(orderId)
        this.appGateway.handleMessage(null, order);
        return order
    }
}
