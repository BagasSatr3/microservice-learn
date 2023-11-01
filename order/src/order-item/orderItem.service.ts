import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from "./orderItem.entity";
import { Repository } from "typeorm";
import { CreateOrderItemDto } from "./dtos/create-orderItem.dto";

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>
        ) {}

    async create(dto: CreateOrderItemDto) {
        const orderItem = this.orderItemRepository.create(dto);

        return await this.orderItemRepository.save(orderItem)
    }

    findMany() {
        return this.orderItemRepository.find()
    }

    findOne(id: number) {
        return this.orderItemRepository.findOne({ where: { id } })
    }

    async update(id: number, dto: CreateOrderItemDto) {
        const orderItem = await this.orderItemRepository.findOne({ where: { id } })

        Object.assign(orderItem, dto)

        return await this.orderItemRepository.save(orderItem)
    }

    async delete(id: number) {
        const orderItem = await this.orderItemRepository.findOne({ where: { id } })

        return await this.orderItemRepository.remove(orderItem)
    }
}