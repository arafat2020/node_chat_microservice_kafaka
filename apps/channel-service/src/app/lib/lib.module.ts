import { Global, Module } from "@nestjs/common";
import { kafkaModule } from "./kafka/kafka.module";

@Global()
@Module({
    imports:[kafkaModule]
})
export class LibModule {}