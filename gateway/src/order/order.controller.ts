import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AppGateway } from 'src/app.gateway';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { ProductService } from 'src/product/product.service';

@Controller('orders')
export class OrderController {
    constructor(
        private readonly productService: ProductService,
        private readonly orderService: OrderService,
        private readonly appGateway: AppGateway,
        private readonly redisCacheService: RedisCacheService,
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
    
    @Post('cache/:key') 
    async createOrder(@Body() dto: CreateOrderDto, @Param('key') key: string) {
        await this.redisCacheService.del(key);
        const orderId = await this.orderService.createOrder(dto)
        console.log("order id",orderId.id)

        // Handle the case when data is not found in the cache
        const product = await this.productService.getProductAll();
        const order = await this.orderService.getOrderItemWithProduct(`${orderId.id}`);

        const combinedData = { product, order };

        await this.redisCacheService.set(key, combinedData, 3600);
        const cachedValue = await this.redisCacheService.get(key);

        const parsedData = JSON.parse(cachedValue);
            const combinedDatab = { product: parsedData.product, order: parsedData.order };
        this.appGateway.handleMessage(null, combinedDatab);

        return orderId;
    }
    
    @Patch(":orderId") 
    async updateOrder(@Param('orderId') orderId: any, @Body() dto: CreateOrderDto) {
        const order = this.orderService.updateOrder(orderId, dto)
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
