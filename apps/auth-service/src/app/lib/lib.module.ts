import { Global, Module } from "@nestjs/common";
import { DdbService } from "./db/db.service";
import { HashService } from "./utils/hash.service";
import { JwtService } from "./utils/jwt.service";

@Global()
@Module({
    providers:[DdbService, HashService, JwtService],
    exports:[DdbService, HashService, JwtService]
})
export class LibModule {}