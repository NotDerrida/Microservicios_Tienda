import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['Administrador', 'Cliente'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  collection: 'users'
});

// Middleware para actualizar updatedAt
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export interface User extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'Administrador' | 'Cliente';
  createdAt: Date;
  updatedAt: Date;
}
