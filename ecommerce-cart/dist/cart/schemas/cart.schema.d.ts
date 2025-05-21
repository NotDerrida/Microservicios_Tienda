import { Document } from 'mongoose';
export type CartDocument = Cart & Document;
export declare class CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}
export declare class Cart {
    userId: string;
    items: CartItem[];
    total: number;
}
export declare const CartSchema: import("mongoose").Schema<Cart, import("mongoose").Model<Cart, any, any, any, Document<unknown, any, Cart, any> & Cart & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cart, Document<unknown, {}, import("mongoose").FlatRecord<Cart>, {}> & import("mongoose").FlatRecord<Cart> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
