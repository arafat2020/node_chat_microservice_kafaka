import { Module } from "@nestjs/common";
import { RedisCacheService } from "./cache/redis-cache.service";

@Module({
    providers:[RedisCacheService]
})
export class LibModule{}