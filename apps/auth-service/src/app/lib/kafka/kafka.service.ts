import { Injectable, Inject, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);

  constructor(@Inject('KAFKA_CLIENT') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.logger.log('Connecting Kafka client...');
    await this.client.connect();
    this.logger.log('Kafka client connected ✅');
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting Kafka client...');
    await this.client.close();
    this.logger.log('Kafka client disconnected ❌');
  }

  // Request-response
  async send<T = any>(topic: string, message: any) {
    this.logger.debug(`Sending message to topic "${topic}"`, message);
    return this.client.send<T, any>(topic, message);
  }

  // Fire-and-forget
  async emit(topic: string, message: any) {
    this.logger.debug(`Emitting event to topic "${topic}"`, message);
    return this.client.emit<any>(topic, message);
  }

  // Subscribe to reply topics (only needed for RPC-style)
  subscribeToResponseOf(topic: string) {
    this.logger.log(`Subscribing to response of topic "${topic}"`);
    this.client.subscribeToResponseOf(topic);
  }
}
