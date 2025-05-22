import { Schema } from 'mongoose';
export declare const CartSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    userId: string;
    items: import("mongoose").Types.DocumentArray<{
        name: string;
        productId: string;
        price: number;
        quantity: number;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        productId: string;
        price: number;
        quantity: number;
    }> & {
        name: string;
        productId: string;
        price: number;
        quantity: number;
    }>;
    total: number;
    status: "Pendiente" | "Procesando" | "Completada" | "Cancelada";
    createdAt: NativeDate;
    shippingAddress?: string | null | undefined;
    paymentMethod?: string | null | undefined;
    phone?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    userId: string;
    items: import("mongoose").Types.DocumentArray<{
        name: string;
        productId: string;
        price: number;
        quantity: number;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        productId: string;
        price: number;
        quantity: number;
    }> & {
        name: string;
        productId: string;
        price: number;
        quantity: number;
    }>;
    total: number;
    status: "Pendiente" | "Procesando" | "Completada" | "Cancelada";
    createdAt: NativeDate;
    shippingAddress?: string | null | undefined;
    paymentMethod?: string | null | undefined;
    phone?: string | null | undefined;
}>, {}> & import("mongoose").FlatRecord<{
    userId: string;
    items: import("mongoose").Types.DocumentArray<{
        name: string;
        productId: string;
        price: number;
        quantity: number;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        productId: string;
        price: number;
        quantity: number;
    }> & {
        name: string;
        productId: string;
        price: number;
        quantity: number;
    }>;
    total: number;
    status: "Pendiente" | "Procesando" | "Completada" | "Cancelada";
    createdAt: NativeDate;
    shippingAddress?: string | null | undefined;
    paymentMethod?: string | null | undefined;
    phone?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
