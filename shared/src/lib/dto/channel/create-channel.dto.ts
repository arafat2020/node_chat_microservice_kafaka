import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ChannelType } from '../../enum/channel-type.enum.js';

export class CreateChannelDto {
  @ApiProperty({
    description: 'The UUID of the server where the channel will be created',
    example: '8f8a2cb4-0c44-4c68-b91f-aae2bd2bcb65',
  })
  @IsUUID()
  @IsNotEmpty()
  serverId: string;

  @ApiProperty({
    description: 'The UUID of the user who is creating the channel',
    example: '2a6e23be-8895-4fb5-b0f9-93f21a1ac98a',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Name of the channel',
    example: 'general',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Type of the channel',
    enum: ChannelType,
    default: ChannelType.TEXT,
  })
  @IsEnum(ChannelType)
  type: ChannelType = ChannelType.TEXT;
}
