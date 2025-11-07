import { BadRequestException, Injectable } from '@nestjs/common';
import { DdbService } from '../../../lib/db/db.service';
import { PromiseMapResponseGeneric, UpdateServerDto } from '@node-chat/shared';

@Injectable()
export class UpdateServerService {
  constructor(private readonly dbService: DdbService) {}

  public async update(
    data: UpdateServerDto
  ): PromiseMapResponseGeneric<unknown> {
    const { serverId, userId, ...rest } = data;
    if (serverId === undefined || userId === undefined) {
      throw new BadRequestException(
        serverId === undefined
          ? 'Server Id is required for updating server'
          : userId === undefined
          ? 'User Id is required for updating server'
          : 'Server Id and User Id are required for updating server'
      );
    }

    try {
      const updated = await this.dbService.server.update({
        where: {
          id: serverId,
          members: {
            some: {
              id: userId,
            },
          },
        },
        data: {
          ...rest,
        },
      });
      return {
        data: updated,
        message: 'Server updated successfully',
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update server \n`' + String(error)
      );
    }
  }
}
