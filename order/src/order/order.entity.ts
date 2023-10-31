import { OrderItem } from "src/order-item/orderItem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    status: string;

    @Column({ default: 0 })
    totalAmount: number;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems: OrderItem[];
}