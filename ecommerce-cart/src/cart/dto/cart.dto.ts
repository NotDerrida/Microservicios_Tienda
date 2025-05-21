export class AddToCartDto {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export class CartItemDto {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}