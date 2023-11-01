import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderItemService } from "./orderItem.service";
import { CreateOrderItemDto } from "./dtos/create-orderItem.dto";

@Controller('orderItems')
export class OrderItemController {
    constructor(
        private readonly orderItemService: OrderItemService,
    ) {}

    @Post()
    create(@Body() dto: CreateOrderItemDto) {
        const orderItem = this.orderItemService.create(dto)
        return orderItem
    }

    @Get()
    find() {
        const orderItem = this.orderItemService.findMany()
        return orderItem
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        const orderItem = this.orderItemService.findOne(id)
        return orderItem
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: CreateOrderItemDto) {
        const orderItem = this.orderItemService.update(id, dto)
        return orderItem
    }

    @Delete(':id')
    delete(@Param('id') id: any) {
        return this.orderItemService.delete(id)
    }
}