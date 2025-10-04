import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../../../generated/prisma";

@Injectable()
export class DdbService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
   async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}