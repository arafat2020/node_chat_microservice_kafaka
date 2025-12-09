import { BadRequestException, Injectable } from '@nestjs/common';
import { DdbService } from '../../../lib/db/db.service';
import { CreateChannelDto, PromiseMapResponseGeneric } from '@node-chat/shared';
import { MemberRole } from '../../../../generated/prisma';

@Injectable()
export class CreateChannelservice {
  constructor(private readonly dbService: DdbService) {}

  private async isServerExist(serverId: string): Promise<boolean> {
    const server = await this.dbService.server.findUnique({
      where: {
        id: serverId,
      },
    });
    return server !== null;
  }

  public async createChannel({
    name,
    serverId,
    type,
    userId,
  }: CreateChannelDto): PromiseMapResponseGeneric<unknown> {
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
      const server = await this.dbService.server.update({
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
            create: {
              profileId: userId,
              name,
              type,
            },
          },
        },
      });

      return {
        data: server,
        message: 'Channel created successfully',
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create channel \n`' + String(error)
      );
    }
  }
}
