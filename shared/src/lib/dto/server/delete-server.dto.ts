import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteServerServiceDto {
  @ApiProperty({
    description: 'UUID of the server to be deleted',
    example: '7d9a2b40-8d6e-4a58-9e51-3f6a75a3b721',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Server ID must be a valid UUID' })
  serverId: string;

  @ApiProperty({
    description: 'UUID of the user requesting the deletion',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'User ID must be a valid UUID' })
  userId: string;
}
