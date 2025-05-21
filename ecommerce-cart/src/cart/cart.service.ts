import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { AddToCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name) private cartModel: Model<CartDocument>
    ) {}

    async addToCart(userId: string, item: AddToCartDto): Promise<Cart> {
        const cart = await this.cartModel.findOne({ userId });

        if (cart) {
            // Si el carrito existe, busca si el producto ya está en él
            const existingItem = cart.items.find(i => i.productId === item.productId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cart.items.push(item);
            }
            cart.total = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            return cart.save();
        }

        // Si no existe el carrito, crea uno nuevo
        return this.cartModel.create({
            userId,
            items: [item],
            total: item.price * item.quantity
        });
    }

    async getCart(userId: string): Promise<Cart | null> {
        return this.cartModel.findOne({ userId });
    }

    async removeFromCart(userId: string, productId: string): Promise<Cart | null> {
        const cart = await this.cartModel.findOne({ userId });
        if (!cart) return null;

        cart.items = cart.items.filter(item => item.productId !== productId);
        cart.total = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        return cart.save();
    }
}