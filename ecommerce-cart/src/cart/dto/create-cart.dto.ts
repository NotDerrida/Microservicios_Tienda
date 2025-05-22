export class CreateCartDto {
  userId: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  shippingAddress?: string; // <--- NUEVO
  paymentMethod?: string;   // <--- NUEVO
  phone?: string;           // <--- NUEVO
}