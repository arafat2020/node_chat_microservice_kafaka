import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from "./kafka.service";

@Global()
@Module({
    imports:[
         ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'message-client',
            brokers: ["localhost:29092"],
          },
          consumer: {
            groupId: 'message-consumer-group',
          },
        },
      },
    ]),
    ],
    providers: [KafkaService],
    exports: [KafkaService],
})
export class LibModule {}