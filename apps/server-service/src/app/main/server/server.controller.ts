import { Controller, Inject, UseGuards } from '@nestjs/common';
import { CreateServerService } from './service/create-server.service';
import { DeleteServerService } from './service/delete-server.service';
import { MessagePattern } from '@nestjs/microservices';
import { DeleteServerServiceDto } from './dto/delete-server.dto';
import { CreateServerDto } from './dto/create-server.dto';

@Controller('server')
export class ServerController {
  constructor(
    private readonly createServerService: CreateServerService,
    private readonly deleteServerService: DeleteServerService
  ) {}

  @MessagePattern('create.server')
  async createServer(data: CreateServerDto) {
    try {
      const server = await this.createServerService.createServer(data);
      return server;
    } catch (error) {
      return {
        data: null,
        message:
          typeof error === 'object' && error !== null && 'message' in error
            ? (error as any).message
            : 'Sign in failed',
        success: false,
      };
    }
  }

  @MessagePattern('delete.server')
  async deleteServer(data: DeleteServerServiceDto) {
    try {
      await this.deleteServerService.deleteServer(data);
      return { success: true };
    } catch (error) {
      return {
        data: null,
        message:
          typeof error === 'object' && error !== null && 'message' in error
            ? (error as any).message
            : 'SignUp in failed',
        success: false,
      };
    }
  }
}
