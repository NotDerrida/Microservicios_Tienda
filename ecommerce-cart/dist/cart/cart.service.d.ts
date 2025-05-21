import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { AddToCartDto } from './dto/cart.dto';
export declare class CartService {
    private cartModel;
    constructor(cartModel: Model<CartDocument>);
    addToCart(userId: string, item: AddToCartDto): Promise<Cart>;
    getCart(userId: string): Promise<Cart | null>;
    removeFromCart(userId: string, productId: string): Promise<Cart | null>;
}
