import { Injectable } from '@nestjs/common';
import { DdbService } from '../../../lib/db/db.service';
import { CreateServerDto } from '../dto/create-server.dto';
import { PromiseMapResponseGeneric } from '@node-chat/shared';
import { MemberRole } from '../../../../generated/prisma';

@Injectable()
export class CreateServerService {
  constructor(private readonly dbService: DdbService) {}

  public async createServer({
    name,
    serverImage,
    userId,
  }: CreateServerDto): PromiseMapResponseGeneric<unknown> {
    try {
      const newServer = await this.dbService.server.create({
        data: {
          name,
          imageUrl: serverImage,
          profileId: userId,
          inviteCode: this.generateRandomString(8),
          channels: {
            create: [
              {
                name: 'General',
                profileId: userId,
              },
            ],
          },
          members: {
            create: [
              {
                userId,
                role: MemberRole.ADMIN,
              },
            ],
          },
        },
      });

      return {
        data: newServer,
        message: 'Server created successfully',
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        message: 'Failed to create server \n`' + String(error),
        success: false,
      };
    }
  }

  private generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
