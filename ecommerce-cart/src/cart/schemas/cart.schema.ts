// src/cart/schemas/cart.schema.ts
import { Schema } from 'mongoose';

export const CartSchema = new Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pendiente', 'Procesando', 'Completada', 'Cancelada'],
    default: 'Pendiente'
  },
  createdAt: { type: Date, default: Date.now }
});