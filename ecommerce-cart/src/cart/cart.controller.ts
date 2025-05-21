import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post(':userId')
    async addToCart(
      @Param('userId') userId: string,
      @Body() item: AddToCartDto
    ) {
      console.log('userId recibido:', userId); // Verifica que no sea null o undefined
      console.log('Producto recibido:', item);
    
      return this.cartService.addToCart(userId, item);
    }

    @Get(':userId')
    async getCart(@Param('userId') userId: string) {
        return this.cartService.getCart(userId);
    }

    @Delete(':userId/:productId')
    async removeFromCart(
        @Param('userId') userId: string,
        @Param('productId') productId: string
    ) {
        return this.cartService.removeFromCart(userId, productId);
    }
}