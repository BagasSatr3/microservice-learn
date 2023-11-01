import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dtos/create-order.dto";

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) {}

    @Post()
    create(@Body() dto: CreateOrderDto) {
        const order = this.orderService.create(dto)
        return order
    }

    @Get()
    find() {
        const order = this.orderService.findMany()
        return order
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        const order = this.orderService.findOne(id)
        return order
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: CreateOrderDto) {
        const order = this.orderService.update(id, dto)
        return order
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.orderService.delete(id)
    }
}