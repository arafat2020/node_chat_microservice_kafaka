import { BadRequestException, Injectable } from '@nestjs/common';
import { DdbService } from '../../../lib/db/db.service';
import {
  GetInvolveServerDto,
  PromiseMapResponseGeneric,
} from '@node-chat/shared';

@Injectable()
export class GetInvolvedServerService {
  constructor(private readonly dbService: DdbService) {}

  public async get({
    id,
  }: GetInvolveServerDto): PromiseMapResponseGeneric<unknown> {
    try {
      const data = await this.dbService.server.findMany({
        where: {
          members: {
            some: {
              id,
            },
          },
        },
      });
      return {
        data,
        message: 'Successfully fetched involved Servers',
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update server \n`' + String(error)
      );
    }
  }
}
