// src/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartsService } from './cart.service';
import { CartSchema } from './schemas/cart.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'cart', schema: CartSchema }
    ])
  ],
  controllers: [CartController],
  providers: [CartsService]
})
export class CartModule {}