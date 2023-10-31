import { Injectable } from '@nestjs/common';
import { OrderMicroservice, ProductMicroservice } from 'libs/api';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrderService {
    async getOrderAll() {
        const response = await OrderMicroservice.get('/orders')
        return response.data
    }

    async getOrderById(orderId: any) {
        const response = await OrderMicroservice.get(`/orders/${orderId}`)
        return response.data
    }

    async createOrder(data: CreateOrderDto) {
        const response = await OrderMicroservice.post('/orders', data)
        return response.data
    }

    async updateOrder(orderId: any, data: CreateOrderDto) {
        const response = await OrderMicroservice.patch(`/orders/${orderId}`, data)
        return response.data
    }

    async deleteOrder(orderId: any) {
        const response = await OrderMicroservice.delete(`/orders/${orderId}`)
        return response.data
    }

    async getOrderItemWithProduct(orderId: any) {
        const orderItemResponse = await OrderMicroservice.get(`/orders/${orderId}`);
        const orderItems = orderItemResponse.data.orderItems;
        console.log("orderItems", orderItems)
      
        // Assuming there's a productId field in order items
        const productPromises = orderItems.map(async (orderItem) => {
          const productResponse = await ProductMicroservice.get(`/products/${orderItem.productId}`);
          const product = productResponse.data;
          return { ...orderItem, product };
        });
      
        const orderItemsWithProduct = await Promise.all(productPromises);
      
        return orderItemsWithProduct;
      }
      
}
