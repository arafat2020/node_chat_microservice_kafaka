/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'file-service',
        brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:29092'],
      },
      consumer: {
        groupId: 'file-service-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3002);
  Logger.log(
    `[=========IGNITION=========] File Service is running`
  );
}

bootstrap();
