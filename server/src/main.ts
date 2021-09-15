import { DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { BaseApp, IApp, HttpExceptionFilter, CustomLogger } from '@itm/appbase';
import { WinstonLogger } from './app.logger';
import { AppModule } from './app.module';
import config from '../config';

class App extends BaseApp implements IApp {
  public constructor() {
    const document = new DocumentBuilder()
      .setTitle('Dyspozucja (McDonald 1.0.0)')
      .setDescription('Dyspozycja Api (McDonald 1.0.0)')
      .setVersion('1.0.0');
    super(document);
  }

  public async bootstrap() {
    this.config = config;
    this.logger = <CustomLogger>(<unknown>new WinstonLogger(this.config));

    this.app = await NestFactory.create(AppModule, {
      logger: this.logger,
      cors: process.env.NODE_ENV !== 'production'
    });
    this.app.setGlobalPrefix('api');
    this.app.useGlobalFilters(new HttpExceptionFilter());
    this.app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // Documentation
    if (process.env.NODE_ENV !== 'production') {
      this.Swagger();
    }

    // Start application
    this.LoadClient();
    await this.app.listen(this.config.port);
    this.DisplayInterfaces();
  }
}

const app = new App();
app.bootstrap();
