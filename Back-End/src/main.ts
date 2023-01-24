import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import swaggerFile from './swagger.json'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))

  app.enableCors();
  
  const document = JSON.parse(
    (await readFile(join(process.cwd(), './src/swagger.json'))).toString('utf-8')
  )
  SwaggerModule.setup('/api', app, document);
  // --------
  
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
