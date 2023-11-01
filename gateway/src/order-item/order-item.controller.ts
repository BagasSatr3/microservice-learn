import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dtos/create-orderItem.dto';
import { AppGateway } from 'src/app.gateway';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';

@Controller('orderItems')
export class OrderItemController {
    constructor(
        private readonly productService: ProductService,
        private readonly orderService: OrderService,
        private readonly orderItemService: OrderItemService,
        private readonly appGateway: AppGateway,
        private readonly redisCacheService: RedisCacheService,
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

    @Post('cache/:key')
    async createOrderItem(@Body() dto: CreateOrderItemDto, @Param('key') key: string, @Param('orderId') orderId: string) {
         const cachedValue = await this.redisCacheService.get(key);
        if (cachedValue) {
            try {
                // Attempt to parse the JSON data
                await this.orderItemService.createOrderItem(dto)
                const parsedData = JSON.parse(cachedValue);
                const combinedData = { product: parsedData.product, order: parsedData.order };

                this.appGateway.handleMessage(null, combinedData);
                return { message: 'Data from Redis cache', product: parsedData };
            } catch (error) {
                console.error('Error parsing JSON:', error);
                // Handle the error, e.g., log it or return an error response
                return { message: 'Error parsing JSON', error: error };
            }
        } else {
            await this.orderItemService.createOrderItem(dto)

            // Handle the case when data is not found in the cache
            const product = await this.productService.getProductAll();
            const order = await this.orderService.getOrderItemWithProduct(orderId);

            const combinedData = { product, order };

            console.log("this is product", product);
            await this.redisCacheService.set(key, combinedData, 3600);
            return { message: 'Data from your data source', product: product };
        }

    }
    @Post('cache/:key/:orderId')
    async createOrderItemsa(@Body() dto: CreateOrderItemDto, @Param('key') key: string, @Param('orderId') orderId: string) {
        await this.redisCacheService.del(key);
            await this.orderItemService.createOrderItem(dto)

            // Handle the case when data is not found in the cache
            const product = await this.productService.getProductAll();
            const order = await this.orderService.getOrderItemWithProduct(orderId);

            const combinedData = { product, order };

            console.log("this is product", product);
            await this.redisCacheService.set(key, combinedData, 3600);
            const cachedValue = await this.redisCacheService.get(key);

            const parsedData = JSON.parse(cachedValue);
                const combinedDatab = { product: parsedData.product, order: parsedData.order };
            this.appGateway.handleMessage(null, combinedDatab);

            return { message: 'Data from your data source', product: product };
        

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
