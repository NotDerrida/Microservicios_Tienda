import {
  Controller,
  Post,
  Get,
  Body,
  UnauthorizedException,
  Req,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.email || !createUserDto.password) {
      throw new UnauthorizedException('Email y password son requeridos');
    }

    const user = await this.usersService.create(createUserDto);
    return {
      message: 'Usuario creado exitosamente',
      user: { email: user.email },
    };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmailOrName(loginUserDto.identifier);
    if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: '1h' }
    );
  
    console.log('Usuario autenticado:', {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }); // Agrega este log para verificar
  
    return {
      status: 'success',
      message: 'Login exitoso',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  @Get('all-users')
  async getAllUsers() {
    try {
      const users = await this.usersService.findAll();
      return {
        status: 'success',
        users
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Error al obtener usuarios',
        error: error.message
      };
    }
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req) {
    // req.user contiene los datos del usuario autenticado por el JWT
    return req.user;
  }
}