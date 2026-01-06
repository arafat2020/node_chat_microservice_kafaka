/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WsAdapter } from '@nestjs/platform-ws';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'event-emitter-service',
        brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:29092'], // change in prod
      },
      consumer: {
        groupId: 'event-emitter-consumer-group',
      },
      // Optional but recommended
      producer: {
        allowAutoTopicCreation: true,
      },
    },
  })
  app.startAllMicroservices()
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useWebSocketAdapter(new WsAdapter(app));
  const port = process.env.PORT || 3011;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
