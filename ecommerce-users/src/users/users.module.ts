import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}