import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { AppGateway } from "src/app.gateway";

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly appGateway: AppGateway,
    ) {}

    @Post()
    create(@Body() dto: CreateOrderDto) {
        const order = this.orderService.create(dto)
        this.appGateway.handleMessage(null, order)
        return order
    }

    @Get()
    find() {
        const order = this.orderService.findMany()
        this.appGateway.handleMessage(null, order)
        return order
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        const order = this.orderService.findOne(id)
        this.appGateway.handleMessage(null, order)
        return order
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: CreateOrderDto) {
        const order = this.orderService.update(id, dto)
        this.appGateway.handleMessage(null, order)
        return order
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        this.orderService.delete(id)
        this.appGateway.handleMessage(null, `Deleted Order with ID ${id}`)
    }
}