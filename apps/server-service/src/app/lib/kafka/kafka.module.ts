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
            clientId: 'server-client',
            brokers: ["localhost:29092"],
          },
          consumer: {
            groupId: 'server-consumer-group',
          },
        },
      },
    ]),
    ],
    providers:[KafkaService],
    exports:[KafkaService],
})
export class kafkaModule {}