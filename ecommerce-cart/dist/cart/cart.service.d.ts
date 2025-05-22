import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartsService {
    private cartModel;
    create(createCartDto: CreateCartDto): Promise<any>;
    findByUserId(userId: string): Promise<any[]>;
}
