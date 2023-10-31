import { Injectable } from '@nestjs/common';
import { OrderMicroservice } from 'libs/api';
import { CreateOrderItemDto } from './dtos/create-orderItem.dto';

@Injectable()
export class OrderItemService {
    async getOrderItemAll() {
        const response = await OrderMicroservice.get('/orderItems')
        return response.data
    }

    async getOrderItemById(orderItemId: any) {
        const response = await OrderMicroservice.get(`/orderItems/${orderItemId}`)
        return response.data
    }

    async createOrderItem(data: CreateOrderItemDto) {
        const response = await OrderMicroservice.post('/orderItems', data)
        console.log(response.data)
        return response.data
    }

    async updateOrderItem(orderItemId: any, data: CreateOrderItemDto) {
        const response = await OrderMicroservice.patch(`/orderItems/${orderItemId}`, data)
        return response.data
    }

    async deleteOrderItem(orderItemId: any) {
        const response = await OrderMicroservice.delete(`/orderItems/${orderItemId}`)
        return response.data
    }
}
