import { Global, Module } from "@nestjs/common";
import { DdbService } from "./db/db.service";
import { HashService } from "./utils/hash.service";
import { JwtService } from "./utils/jwt.service";
import { JwtService as JwtServiceRoot} from '@nestjs/jwt'

@Global()
@Module({
    providers:[DdbService, HashService, JwtService, JwtServiceRoot],
    exports:[DdbService, HashService, JwtService, JwtServiceRoot]
})
export class LibModule {}