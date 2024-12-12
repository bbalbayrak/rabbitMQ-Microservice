import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepo: OrderRepository) {}

  async creteaOrder(body: any): Promise<Order> {
    return await this.ordersRepo.create(body);
  }

  async getOrders(): Promise<Order[]> {
    const orders = this.ordersRepo.find({});
    return orders;
  }
}
