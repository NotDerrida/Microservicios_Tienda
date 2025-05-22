import { CartsService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    create(createCartDto: CreateCartDto): Promise<any>;
    findByUserId(userId: string): Promise<any[]>;
}
