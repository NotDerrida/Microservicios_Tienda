import { CartService } from './cart.service';
import { AddToCartDto } from './dto/cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(userId: string, item: AddToCartDto): Promise<import("./schemas/cart.schema").Cart>;
    getCart(userId: string): Promise<import("./schemas/cart.schema").Cart | null>;
    removeFromCart(userId: string, productId: string): Promise<import("./schemas/cart.schema").Cart | null>;
}
