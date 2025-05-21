import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class CartItem {
    @Prop({ required: true })
    productId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true, default: 1 })
    quantity: number;
}

@Schema({ timestamps: true })
export class Cart {
    @Prop({ required: true })
    userId: string;

    @Prop([CartItem])
    items: CartItem[];

    @Prop({ default: 0 })
    total: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);