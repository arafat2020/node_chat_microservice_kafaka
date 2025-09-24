import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../../../generated/prisma";

@Injectable()
export class DdbService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleDestroy() {
        return this.$disconnect();
    }
    async onModuleInit() {
        await this.$connect();
    }
}