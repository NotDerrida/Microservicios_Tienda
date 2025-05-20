import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    console.log('Recibiendo orden:', createOrderDto);
    
    if (!createOrderDto.userId) {
      throw new BadRequestException('userId es requerido');
    }

    try {
      const createdOrder = new this.orderModel(createOrderDto);
      return await createdOrder.save();
    } catch (error) {
      console.error('Error al crear orden:', error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find()
      .sort({ createdAt: -1 }) // Ordenar por fecha de creación, más reciente primero
      .exec();
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateStatus(orderId: string, status: string): Promise<Order> {
    const order = await this.orderModel.findByIdAndUpdate(
      orderId,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true }
    ).exec();

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return order;
  }
}