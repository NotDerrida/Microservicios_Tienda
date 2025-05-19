import { Schema, Document } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Activado', 'Desactivado'], 
    default: 'Activado' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  collection: 'products'
});

ProductSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export interface Product extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  status: 'Activado' | 'Desactivado';
  createdAt: Date;
  updatedAt: Date;
}