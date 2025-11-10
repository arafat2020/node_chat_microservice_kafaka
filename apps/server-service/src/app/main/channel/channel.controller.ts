import { Controller } from "@nestjs/common";
import { DeleteChannelService } from "./service/delete-channel.service";
import { GetChannelService } from "./service/get-channel.service";
import { UpdateChannelService } from "./service/update-channel.service";
import {MessagePattern} from '@nestjs/microservices'
import { CreateChannelDto, DeleteChannelDto, IdDto, UpdateChannelDto } from "@node-chat/shared";
import { CreateChannelservice } from "./service/create-channel.service";

@Controller()
export class ChannelController{
    constructor(
        private readonly deleteChannelService: DeleteChannelService,
        private readonly getChannelService: GetChannelService,
        private readonly updateChannelService: UpdateChannelService,
        private readonly createChannel: CreateChannelservice ,
    ){}

    @MessagePattern('channel.delete')
    async delete(data: DeleteChannelDto){

        return await this.deleteChannelService.del(data)

    }


    @MessagePattern('channel.get')
    async get(data: IdDto){

        return await this.getChannelService.get(data)

    }

    @MessagePattern('channel.update')
    async update(data: UpdateChannelDto){

        return await this.updateChannelService.update(data)

    }

    @MessagePattern('channel.create')
    async create(data: CreateChannelDto){

        return await this.createChannel.createChannel(data)

    }
}