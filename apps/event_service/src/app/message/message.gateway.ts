import { Injectable, Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";

@Injectable()
@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private logger = new Logger(MessageGateway.name);
    private localClients: Map<string, any> = new Map();
    handleConnection(client: any, ...args: any[]): any {
        this.logger.debug(`Client connected: ${client.id}`);
    }
    handleDisconnect(client: any): any {
        this.logger.debug(`Client disconnected: ${client.id}`);
    }
}