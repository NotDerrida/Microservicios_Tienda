// src/dto/create-cart.dto.ts
export class CreateCartDto {
  userId: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}