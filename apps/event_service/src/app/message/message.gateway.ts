import { Injectable, Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";
import { v4 as uuidv4 } from 'uuid';
import { RedisCacheService } from "../../lib/cache/redis-cache.service";


import { OnModuleInit } from '@nestjs/common';

@Injectable()
@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
    private logger = new Logger(MessageGateway.name);
    private localClients: Map<string, any> = new Map();


    constructor(private redisService: RedisCacheService) { }

    onModuleInit() {
        this.redisService.subscribe('ws:broadcast', (message) => {
            //this.broadcastToLocalClients(message);
        });
    }

    async handleConnection(client: any, ...args: any[]): Promise<any> {

        const clientId = uuidv4();
        client.id = clientId;

        this.localClients.set(clientId, client);

        await this.redisService.addClient(clientId, {
            connectedAt: new Date().toISOString(),
            serverId: process.env.SERVER_ID || 'server-1',
        });

        const count = await this.redisService.getClientCount();
        this.logger.debug(`Client connected: ${clientId}. Total clients: ${count}`);
    }

    async handleDisconnect(client: any): Promise<any> {

        if (client.id) {
            this.localClients.delete(client.id);
            await this.redisService.removeClient(client.id);

            const count = await this.redisService.getClientCount();
            this.logger.debug(`Client disconnected: ${client.id}. Total clients: ${count}`);
        }
    }
}