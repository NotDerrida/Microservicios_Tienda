import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsEnum(['Activado', 'Desactivado'])
  status: 'Activado' | 'Desactivado' = 'Activado';
}