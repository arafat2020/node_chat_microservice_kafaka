import { BadRequestException, Injectable } from '@nestjs/common';
import { DdbService } from '../../../lib/db/db.service';
import { GetServerDto, PromiseMapResponseGeneric } from '@node-chat/shared';

@Injectable()
export class GetServerService {
  constructor(private readonly dbService: DdbService) {}

  public async get({
    serverId,
    userId,
  }: GetServerDto): PromiseMapResponseGeneric<unknown> {
    try {
        const data = await this.dbService.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            id: userId,
          },
        },
      },
      include:{
        channels:{
            where:{
                name:"General"
            },
            orderBy:{
                createdAt:"asc"
            }
        }
      }
    });
    return {
        data,
        message:"Successfully fetched Server",
        success:true
    }
    } catch (error) {
       throw new BadRequestException(
        'Failed to update server \n`' + String(error)
      );
    }
  }
}
