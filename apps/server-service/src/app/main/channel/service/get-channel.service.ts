import { BadRequestException, Injectable } from '@nestjs/common';
import { DdbService } from '../../../lib/db/db.service';
import { IdDto, PromiseMapResponseGeneric } from '@node-chat/shared';

@Injectable()
export class GetChannelService {
  constructor(private readonly dbService: DdbService) {}

  public async get({ id }: IdDto): PromiseMapResponseGeneric<unknown> {
    {
      try {
        const data = await this.dbService.server.findUnique({
          where: {
            id,
          },
          include: {
            channels: {
              orderBy: {
                createdAt: 'asc',
              },
            },
            members: {
              orderBy: {
                role: 'asc',
              },
            },
          },
        });
        return {
          data,
          message: 'All channel fetched successfully',
          success: true,
        };
      } catch (error) {
        throw new BadRequestException(
          'Failed to delete channel \n`' + String(error)
        );
      }
    }
  }
}
