import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { AppGateway } from 'src/app.gateway';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { OrderService } from 'src/order/order.service';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly orderService: OrderService,
        private readonly appGateway: AppGateway,
        private readonly redisCacheService: RedisCacheService,
    ) {}

    @Get('cache/:key/:orderId')
    async getAllProducts(@Param('key') key: string, @Param('orderId') orderId: string) {
        const cachedValue = await this.redisCacheService.get(key);
        if (cachedValue) {
            try {
                // Attempt to parse the JSON data
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
            // Handle the case when data is not found in the cache
            const product = await this.productService.getProductAll();
            const order = await this.orderService.getOrderItemWithProduct(orderId);

            const combinedData = { product, order };

            console.log("this is product", product);
            await this.redisCacheService.set(key, combinedData, 3600);
            return { message: 'Data from your data source', product: product };
        }
    }

    @Get('cache/:key')
    async getAllProductsa(@Param('key') key: string) {
        const cachedValue = await this.redisCacheService.get(key);
        if (cachedValue) {
            try {
                // Attempt to parse the JSON data
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
            // Handle the case when data is not found in the cache
            const product = await this.productService.getProductAll();

            const combinedData = { product };

            console.log("this is product", product);
            await this.redisCacheService.set(key, combinedData, 3600);
            return { message: 'Data from your data source', product: product };
        }
    }
    

    @Get("cache/:key/:productId")
    async getProduct(@Param('key') key: string, @Param('productId') productId: number) {
        const cachedValue = await this.redisCacheService.get(key);
        this.appGateway.handleMessage(null, cachedValue);

        if (cachedValue) {
            return { message: 'Data from Redis cache', data: cachedValue };
          } else {
            // If the data is not found in the cache, fetch it from your data source
            // and then cache it for future use
            const product = this.productService.getProductById(productId)
            const cachedValue = await this.redisCacheService.get(key);
            return { message: 'Data from your data source', data: cachedValue  };
        }
    }
    
    @Post('cache/:key') 
    async createProduct(@Body() dto: CreateProductDto , @Param('key') key: string) {
        const product = await this.productService.createProduct(dto)

        await this.redisCacheService.del(key);
        this.appGateway.handleMessage(null, product);
        return product
    }

    @Patch(":productId") 
    async updateProduct(@Param('productId') productId: number, @Body() dto: CreateProductDto) {
        const product = this.productService.updateProduct(productId, dto)
        this.appGateway.handleMessage(null, product);
        return product
    }
    
    @Delete(":productId")
    async deleteProduct(@Param('productId') productId: number) {
        this.productService.deleteProduct(productId)
        this.appGateway.handleMessage(null, `Deleted Product with ID ${productId}`);
    }
}
