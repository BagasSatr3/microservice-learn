import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dtos/create-product.dto";

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productService: ProductsService,
    ) {}

    @Post()
    create(@Body() dto: CreateProductDto) {
        const product =  this.productService.create(dto)
        return product
    }

    @Get()
    find() {
        const product = this.productService.findMany()
        return product
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        const product = this.productService.findOne(id)
        return product
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: CreateProductDto) {
        const product = this.productService.update(id, dto)
        return product
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.productService.delete(id)
    }
}