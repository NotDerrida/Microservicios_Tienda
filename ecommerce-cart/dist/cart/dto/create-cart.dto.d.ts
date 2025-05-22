export declare class CreateCartDto {
    userId: string;
    items: Array<{
        productId: string;
        name: string;
        price: number;
        quantity: number;
    }>;
    total: number;
    shippingAddress?: string;
    paymentMethod?: string;
    phone?: string;
}
