export declare class Cart {
    id: number;
    userId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
    total: number;
}
