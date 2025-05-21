// src/cart/cart.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CartsService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('carts') // 👈 Cambia a plural
@UseGuards(AuthGuard('jwt')) // Protege todas las rutas
export class CartController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.cartsService.findByUserId(userId);
  }
}