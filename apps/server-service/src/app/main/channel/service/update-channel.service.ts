import { BadRequestException, Injectable } from '@nestjs/common';
import { DdbService } from '../../../lib/db/db.service';
import { PromiseMapResponseGeneric, UpdateChannelDto } from '@node-chat/shared';
import { MemberRole } from '../../../../generated/prisma';

@Injectable()
export class UpdateChannelService {
  constructor(private readonly dbService: DdbService) {}

  private async isServerExist(serverId: string): Promise<boolean> {
    const server = await this.dbService.server.findUnique({
      where: {
        id: serverId,
      },
    });
    return server !== null;
  }

  public async update({
    channelId,
    serverId,
    userId,
    name,
    type,
  }: UpdateChannelDto):PromiseMapResponseGeneric<unknown> {
    if (name === 'General') {
      throw new BadRequestException(
        'Channel name "General" is reserved and cannot be used.'
      );
    }

    const isExist = await this.isServerExist(serverId);

    if (!isExist) {
      throw new BadRequestException('Server does not exist');
    }

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
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              NOT: {
                name: 'General',
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return{
      success: true,
      data,
      message: 'Channel updated successfully',
    }
   } catch (error) {
    throw new BadRequestException('Failed to update channel' + `\n ${String(error)}`);
   }
  }
}
