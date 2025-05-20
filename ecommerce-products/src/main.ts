import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    console.log('Iniciando servidor...');
    await app.listen(3002);
    console.log('Servidor corriendo en puerto 3002');
    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}
bootstrap();
