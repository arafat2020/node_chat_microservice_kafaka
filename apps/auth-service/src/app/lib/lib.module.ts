import { Global, Module } from "@nestjs/common";
import { DdbService } from "./db/db.service";
import { HashService } from "./utils/hash.service";
import { JwtService } from "./utils/jwt.service";
import { JwtService as JwtServiceRoot} from '@nestjs/jwt'
import { KafkaModule } from "./kafka/kafka.module";

@Global()
@Module({
    imports:[KafkaModule],
    providers:[DdbService, HashService, JwtService, JwtServiceRoot],
    exports:[DdbService, HashService, JwtService, JwtServiceRoot]
})
export class LibModule {}