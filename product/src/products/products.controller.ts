import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { AppGateway } from "src/app.gateway";

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productService: ProductsService,
        private readonly appGateway: AppGateway,
    ) {}

    @Post()
    create(@Body() dto: CreateProductDto) {
        const product =  this.productService.create(dto)
        this.appGateway.handleMessage(null, product);
        return product
    }

    @Get()
    find() {
        const product = this.productService.findMany()
        this.appGateway.handleMessage(null, product);
        return product
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        const product = this.productService.findOne(id)
        this.appGateway.handleMessage(null, product);
        return product
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: CreateProductDto) {
        const product = this.productService.update(id, dto)
        this.appGateway.handleMessage(null, product);
        return product
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        this.productService.delete(id)
        this.appGateway.handleMessage(null, `Deleted Product with ID ${id}`);
    }
}