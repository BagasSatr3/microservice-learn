import { Order } from "src/order/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orderitems' })
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    subtotal: number;

    @Column()
    productId: number;

    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order;
}