import { Module } from "@nestjs/common";
import { ChannelController } from "./channel.controller";
import { CreateServerService } from "../server/service/create-server.service";
import { UpdateChannelService } from "./service/update-channel.service";
import { DeleteChannelService } from "./service/delete-channel.service";
import { GetChannelService } from "./service/get-channel.service";

@Module({
    controllers:[
        ChannelController
    ],
    providers:[
        CreateServerService,
        UpdateChannelService,
        DeleteChannelService,
        GetChannelService
    ]
})
export class ChannelModule{}