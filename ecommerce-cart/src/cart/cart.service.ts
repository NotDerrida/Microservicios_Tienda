import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { OnModuleInit } from '@nestjs/common';




@Injectable()
export class CartsService {
  @InjectModel('cart') private cartModel: Model<any>

  async create(createCartDto: CreateCartDto): Promise<any> {
    if (!createCartDto.userId) {
      throw new BadRequestException('userId es requerido');
    }

    const createdCart = new this.cartModel(createCartDto);
    return await createdCart.save();
  }

  async findByUserId(userId: string): Promise<any[]> {
    return this.cartModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}
