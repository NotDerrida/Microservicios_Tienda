import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(@InjectModel('Cart') private CartModel: Model<Cart>) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    console.log('Recibiendo orden:', createCartDto);
    
    if (!createCartDto.userId) {
      throw new BadRequestException('userId es requerido');
    }

    try {
      const createdCart = new this.CartModel(createCartDto);
      return await createdCart.save();
    } catch (error) {
      console.error('Error al crear orden:', error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Cart[]> {
    return this.CartModel.find()
      .sort({ createdAt: -1 }) // Ordenar por fecha de creación, más reciente primero
      .exec();
  }

  async findByUserId(userId: string): Promise<Cart[]> {
    return this.CartModel.find({ userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateStatus(cartId: string, status: string): Promise<Cart> {
    const cart = await this.CartModel.findByIdAndUpdate(
      cartId,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true }
    ).exec();

    if (!cart) {
      throw new NotFoundException(`cart with ID ${cartId} not found`);
    }

    return cart;
  }
}