import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class DeleteChannelDto {
     @ApiProperty({
        description: 'UUID of the server Id of the channel to be deleted',
        example: '550e8400-e29b-41d4-a716-446655440000',
      })
      @IsUUID()
      @IsNotEmpty({ message: 'User ID must be a valid UUID' })
      serverId: string;

      @ApiProperty({
        description: 'UUID of the user Id',
        example: '550e8400-e29b-41d4-a716-446655440000',
      })
      @IsUUID()
      @IsNotEmpty({ message: 'User ID must be a valid UUID' })
      userId: string;

      @ApiProperty({
        description: 'UUID of the user requesting the deletion',
        example: '550e8400-e29b-41d4-a716-446655440000',
      })
      @IsUUID()
      @IsNotEmpty({ message: 'UUID for the channel Id' })
      channelId: string;
}