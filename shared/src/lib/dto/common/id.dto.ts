import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdDto {
  @ApiProperty({
    description: 'UUID of the user requesting the deletion',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'User ID must be a valid UUID' })
  id: string;
}
