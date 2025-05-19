// filepath: h:\ATareasUACJ\Programacion Integrativa\P_Microservicios\EcommerceM\ecommerce-products\src\products\products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: string, updateProductDto: Partial<CreateProductDto>): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async remove(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}