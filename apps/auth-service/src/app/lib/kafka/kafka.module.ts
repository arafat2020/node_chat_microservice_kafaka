import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Global()
@Module({
    imports:[
         ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth-client',
            brokers: ["localhost:29092"],
          },
          consumer: {
            groupId: 'auth-consumer-group',
          },
        },
      },
    ]),
    ],
    providers:[KafkaService]
})
export class KafkaModule {}