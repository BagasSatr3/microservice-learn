import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { AppGateway } from 'src/app.gateway';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly appGateway: AppGateway,
    ) {}

    @Get()
    async getAllProducts() {
        const product = this.productService.getProductAll()
        this.appGateway.handleMessage(null, product);
        return product
    }

    @Get(":productId")
    async getProduct(@Param('productId') productId: number) {
        const product = this.productService.getProductById(productId)
        this.appGateway.handleMessage(null, product);
        return product
    }
    
    @Post() 
    async createProduct(@Body() dto: CreateProductDto) {
        const product = this.productService.createProduct(dto)
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
