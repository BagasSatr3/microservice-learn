import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductMicroservice } from 'libs/api';

@Injectable()
export class ProductService {
    async getProductAll() {
        const response = await ProductMicroservice.get('/products')
        return response.data
    }

    async getProductById(productId: any) {
        const response = await ProductMicroservice.get(`/products/${productId}`)
        return response.data
    }

    async createProduct(data: CreateProductDto) {
        const response = await ProductMicroservice.post('/products', data)
        return response.data
    }

    async updateProduct(productId: any, data: CreateProductDto) {
        const response = await ProductMicroservice.patch(`/products/${productId}`, data)
        return response.data
    }

    async deleteProduct(productId: any) {
        const response = await ProductMicroservice.delete(`/products/${productId}`)
        return response.data
    }
}
