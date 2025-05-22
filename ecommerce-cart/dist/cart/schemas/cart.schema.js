"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CartSchema = new mongoose_1.Schema({
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
    shippingAddress: { type: String },
    paymentMethod: { type: String },
    phone: { type: String },
    status: {
        type: String,
        enum: ['Pendiente', 'Procesando', 'Completada', 'Cancelada'],
        default: 'Pendiente'
    },
    createdAt: { type: Date, default: Date.now }
});
//# sourceMappingURL=cart.schema.js.map