import { Controller, Post } from "@nestjs/common";
import { KafkaService } from "../../lib/kafka.service";

@Controller()
export class ServerController {
    constructor(
        private readonly kafkaService: KafkaService,
    ) {}

    @Post('create-server')
    async createServer() {
        return 0;
    }

}