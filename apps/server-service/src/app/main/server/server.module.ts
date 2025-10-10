import {  Module } from "@nestjs/common";
import { CreateServerService } from "./service/create-server.service";
import { DeleteServerService } from "./service/delete-server.service";
import { ServerController } from "./server.controller";

@Module({
    providers: [
        CreateServerService,
        DeleteServerService
    ],
    controllers: [ServerController]
})
export class ServerModule {}