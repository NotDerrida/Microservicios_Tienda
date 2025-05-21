// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3004;
  await app.listen(port, 'localhost'); // 👈 Forza que escuche en localhost
  console.log(`Servidor corriendo en http://localhost:${port}`);
}
bootstrap();