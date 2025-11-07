import {  Module } from "@nestjs/common";
import { CreateServerService } from "./service/create-server.service";
import { DeleteServerService } from "./service/delete-server.service";
import { ServerController } from "./server.controller";
import { UpdateServerService } from "./service/update-server.service";
import { GetServerService } from "./service/getServer.service";
import { LeaveServerService } from "./service/leave-server.service";
import { GetInvolvedServerService } from "./service/get-involved-server.service";

@Module({
    providers: [
        CreateServerService,
        DeleteServerService,
        UpdateServerService,
        GetServerService,
        LeaveServerService,
        GetInvolvedServerService
    ],
    controllers: [ServerController]
})
export class ServerModule {}