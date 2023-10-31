import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dtos/create-order.dto";

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {}

    async create(dto: CreateOrderDto) {
        const order = this.orderRepository.create(dto);

        return await this.orderRepository.save(order)
    }

    findMany() {
        return this.orderRepository.find({
            relations: ["orderItems"]
        })
    }

    findOne(id: number) {
        return this.orderRepository.findOne({ 
            where: { id },
            relations: ["orderItems"]
        })
    }

    async update(id: number, dto: CreateOrderDto) {
        const order = await this.orderRepository.findOne({ where: { id } })

        Object.assign(order, dto)

        return await this.orderRepository.save(order)
    }

    async delete(id: number) {
        const order = await this.orderRepository.findOne({ where: { id } })

        return await this.orderRepository.remove(order)
    }
}