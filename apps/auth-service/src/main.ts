/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
       options: {
          client: {
            clientId: 'auth-client',
            brokers: process.env.KAFKA_BROKERS?.split(',') || ["localhost:29092"],
          },
          consumer: {
            groupId: 'auth-consumer-group',
          },
        },
    }
  );
  await app.listen();
  Logger.log(
    `[========IGNITION=========] Auth Service is running`
  );
}

bootstrap();
