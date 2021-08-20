import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { config } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  app.enableCors({ origin: config.allowedOrigins });
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(compression());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));

  if (config.env === 'development') {
    logger.log(`App running in ${config.env} mode!`);
    const options = new DocumentBuilder()
      .setTitle('VOIS Challenge')
      .setDescription(
        'The main idea of the task is to build an application to manage working tasks.',
      )
      .setVersion('1.0')
      .addTag('VOIS')
      .addBearerAuth({ type: 'http', scheme: 'bearer' })
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }
  await app.listen(config.port);
  logger.log(`App listening on port ${config.port}`);
}
bootstrap();
