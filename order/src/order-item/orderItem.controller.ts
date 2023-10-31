import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderItemService } from "./orderItem.service";
import { CreateOrderItemDto } from "./dtos/create-orderItem.dto";
import { AppGateway } from "src/app.gateway";

@Controller('orderItems')
export class OrderItemController {
    constructor(
        private readonly orderItemService: OrderItemService,
        private readonly appGateway: AppGateway,
    ) {}

    @Post()
    create(@Body() dto: CreateOrderItemDto) {
        const orderItem = this.orderItemService.create(dto)
        this.appGateway.handleMessage(null, orderItem)
        return orderItem
    }

    @Get()
    find() {
        const orderItem = this.orderItemService.findMany()
        this.appGateway.handleMessage(null, orderItem)
        return orderItem
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        const orderItem = this.orderItemService.findOne(id)
        this.appGateway.handleMessage(null, orderItem)
        return orderItem
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: CreateOrderItemDto) {
        const orderItem = this.orderItemService.update(id, dto)
        this.appGateway.handleMessage(null, orderItem)
        return orderItem
    }

    @Delete(':id')
    delete(@Param('id') id: any) {
        this.orderItemService.delete(id)
        this.appGateway.handleMessage(null, `Deleted Order Item with ID ${id}`)
    }
}