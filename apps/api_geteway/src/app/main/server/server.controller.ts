import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { KafkaService } from '../../lib/kafka.service';
import { lastValueFrom } from 'rxjs';
import {
  AuthMetaData,
  CreateServerDto,
  DeleteServerServiceDto,
} from '@node-chat/shared';
import { HTTP_Guard } from '../../guard/microservice-auth-two.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class ServerController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('create-server')
  @ApiBearerAuth()
  @UseGuards(HTTP_Guard)
  async createServer(
    @Body() rawData: CreateServerDto,
    @Req() req: Request & { user: AuthMetaData }
  ) {
    rawData.userId = req.user.sub;
    return await lastValueFrom(
      this.kafkaService.send('create.server', rawData)
    );
  }

  @Post('delete-server')
  @ApiBearerAuth()
  @UseGuards(HTTP_Guard)
  async deleteServer(
    @Body() rawData: DeleteServerServiceDto,
    @Req() req: Request & { user: AuthMetaData }
) {
    rawData.userId = req.user.sub;
    return await lastValueFrom(
      this.kafkaService.send('delete.server', rawData)
    );
  }
}
