"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_schema_1 = require("./schemas/cart.schema");
let CartService = class CartService {
    cartModel;
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    async addToCart(userId, item) {
        const cart = await this.cartModel.findOne({ userId });
        if (cart) {
            const existingItem = cart.items.find(i => i.productId === item.productId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            }
            else {
                cart.items.push(item);
            }
            cart.total = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            return cart.save();
        }
        return this.cartModel.create({
            userId,
            items: [item],
            total: item.price * item.quantity
        });
    }
    async getCart(userId) {
        return this.cartModel.findOne({ userId });
    }
    async removeFromCart(userId, productId) {
        const cart = await this.cartModel.findOne({ userId });
        if (!cart)
            return null;
        cart.items = cart.items.filter(item => item.productId !== productId);
        cart.total = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        return cart.save();
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map