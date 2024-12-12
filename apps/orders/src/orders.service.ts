import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { Order } from './schemas/order.schema';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepo: OrderRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async creteaOrder(body: any): Promise<Order> {
    const session = await this.ordersRepo.startTransaction();
    try {
      const order = await this.ordersRepo.create(body, { session });
      await lastValueFrom(this.billingClient.emit('created_order', { body }));
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async getOrders(): Promise<Order[]> {
    const orders = this.ordersRepo.find({});
    return orders;
  }
}
