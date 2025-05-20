import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'El ID de usuario es requerido'],
    trim: true
  },
  items: [{
    productId: {
      type: String,
      required: [true, 'El ID del producto es requerido']
    },
    name: {
      type: String,
      required: [true, 'El nombre del producto es requerido']
    },
    price: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio no puede ser negativo']
    },
    quantity: {
      type: Number,
      required: [true, 'La cantidad es requerida'],
      min: [1, 'La cantidad mínima es 1']
    }
  }],
  total: {
    type: Number,
    required: [true, 'El total es requerido'],
    min: [0, 'El total no puede ser negativo']
  },
  status: {
    type: String,
    enum: ['Pendiente', 'Procesando', 'Completada', 'Cancelada'],
    default: 'Pendiente'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});