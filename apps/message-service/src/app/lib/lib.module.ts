import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from "./kafka/kafka.service";
import { DbService } from "./db/db.service";

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
    providers: [KafkaService, DbService],
    exports: [KafkaService, DbService],
})
export class LibModule {}