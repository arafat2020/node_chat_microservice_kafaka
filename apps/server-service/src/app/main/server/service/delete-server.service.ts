import { Injectable } from '@nestjs/common';
import { DdbService } from '../../../lib/db/db.service';
import { PromiseMapResponseGeneric } from '@node-chat/shared';
import { DeleteServerServiceDto } from '../dto/delete-server.dto';

@Injectable()
export class DeleteServerService {
  constructor(private readonly dbService: DdbService) {}

  public async deleteServer({
    serverId,
    userId,
  }: DeleteServerServiceDto): PromiseMapResponseGeneric<unknown> {
    try {
      const deletedServer = await this.dbService.server.delete({
        where: {
          id: serverId,
          profileId: userId,
        },
      });

      return {
        data: deletedServer,
        message: 'Server deleted successfully',
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        message: 'Failed to delete server \n`' + String(error),
        success: false,
      };
    }
  }
}
