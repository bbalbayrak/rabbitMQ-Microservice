import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { orderDto } from './dto/create-order.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() body: orderDto) {
    return this.ordersService.creteaOrder(body);
  }

  @Get()
  async getOrders(@Res() res: Response) {
    const orders = await this.ordersService.getOrders();
    return res.status(HttpStatus.OK).json({
      message: 'Orders fetched successfully',
      data: orders,
    });
  }
}
