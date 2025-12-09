import { BadRequestException, Injectable } from "@nestjs/common";
import { DdbService } from "../../../lib/db/db.service";
import { DeleteChannelDto, PromiseMapResponseGeneric } from "@node-chat/shared";
import { MemberRole } from "../../../../generated/prisma";

@Injectable()
export class DeleteChannelService {
    constructor(
        private readonly dbService: DdbService
    ){}

    public async del({
        channelId,
        userId,
        serverId,
    }: DeleteChannelDto): PromiseMapResponseGeneric<unknown> {
        try {
            const data = await this.dbService.server.update({
             where: {
                      id: serverId,
                      members: {
                        some: {
                          userId,
                          role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                          },
                        },
                      },
                    },
                    data:{
                        channels:{
                            delete:{
                                id: channelId,
                                name:{
                                    not: 'General',
                                }
                            }
                        }
                    }
        });
            return {
                data,
                message: 'Channel deleted successfully',
                success: true,
            };
        } catch (error) {
            throw new BadRequestException(
              'Failed to delete channel \n`' + String(error)
            );
        }
    }
}