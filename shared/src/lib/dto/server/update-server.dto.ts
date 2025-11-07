import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateServerDto } from "./create-server.dto.js";
import { IsNotEmpty, IsUUID } from "class-validator";

export class UpdateServerDto extends PartialType(CreateServerDto){
      @ApiProperty({
        description: 'UUID of the user creating the server',
        example: '550e8400-e29b-41d4-a716-446655440000',
      })
      @IsUUID()
      @IsNotEmpty({ message: 'Server ID must be a valid UUID' })
      serverId: string;
}