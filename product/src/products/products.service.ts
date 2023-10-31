import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dtos/create-product.dto";

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

    async create(dto: CreateProductDto) {
        const product = this.productRepository.create(dto);

        return await this.productRepository.save(product)
    }

    findMany() {
        return this.productRepository.find()
    }

    findOne(id: number) {
        return this.productRepository.findOne({ where: { id } })
    }

    async update(id: number, dto: CreateProductDto) {
        const product = await this.productRepository.findOne({ where: { id } })

        Object.assign(product, dto)

        return await this.productRepository.save(product)
    }

    async delete(id: number) {
        const product = await this.productRepository.findOne({ where: { id } })

        return await this.productRepository.remove(product)
    }
}