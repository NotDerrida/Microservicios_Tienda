import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findOne(email: string): Promise<User | undefined> {
    return (await this.userModel.findOne({ email }).exec()) ?? undefined;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findByEmailOrName(identifier: string): Promise<User | undefined> {
    return await this.userModel.findOne({
      $or: [
        { email: identifier },
        { name: identifier }
      ]
    }).exec() ?? undefined;
  }
}