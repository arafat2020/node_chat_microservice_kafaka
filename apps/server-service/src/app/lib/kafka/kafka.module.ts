import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from "./kafka.service";

@Module({
    imports:[
         ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
         options: {
          client: {
            clientId: 'channel-client',
            brokers: ["localhost:29092"],
          },
          consumer: {
            groupId: 'channel-consumer-group',
          },
        },
      },
    ]),
    ],
    providers:[KafkaService]
})
export class kafkaModule {}