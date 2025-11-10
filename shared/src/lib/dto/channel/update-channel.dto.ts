import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ChannelType } from 'src/lib/enum/channel-type.enum.js';

export class UpdateChannelDto {
  @ApiProperty({
    description: 'UUID of the server the channel belongs to',
    example: '8f8a2cb4-0c44-4c68-b91f-aae2bd2bcb65',
  })
  @IsUUID()
  @IsNotEmpty()
  serverId: string;

  @ApiProperty({
    description: 'UUID of the user performing the update',
    example: '2a6e23be-8895-4fb5-b0f9-93f21a1ac98a',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'UUID of the channel to update',
    example: 'f5d4b3be-7f3f-4cd4-8b83-9cb41a1f11aa',
  })
  @IsUUID()
  @IsNotEmpty()
  channelId: string;

  @ApiProperty({
    description: 'New name of the channel (optional)',
    example: 'voice-chat',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'New channel type (optional)',
    enum: ChannelType,
    required: false,
  })
  @IsEnum(ChannelType)
  @IsOptional()
  type?: ChannelType;
}
