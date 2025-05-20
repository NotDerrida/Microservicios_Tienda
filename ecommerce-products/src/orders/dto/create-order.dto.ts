export class CreateOrderDto {
  userId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}