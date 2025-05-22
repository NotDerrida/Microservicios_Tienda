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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CartsService = class CartsService {
    cartModel;
    async create(createCartDto) {
        if (!createCartDto.userId) {
            throw new common_1.BadRequestException('userId es requerido');
        }
        const createdCart = new this.cartModel(createCartDto);
        return await createdCart.save();
    }
    async findByUserId(userId) {
        return this.cartModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }
};
exports.CartsService = CartsService;
__decorate([
    (0, mongoose_1.InjectModel)('cart'),
    __metadata("design:type", mongoose_2.Model)
], CartsService.prototype, "cartModel", void 0);
exports.CartsService = CartsService = __decorate([
    (0, common_1.Injectable)()
], CartsService);
//# sourceMappingURL=cart.service.js.map