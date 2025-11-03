import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateServerDto {
  @ApiProperty({
    description: 'Name of the server',
    example: 'My Cool Server',
  })
  @IsString()
  @IsNotEmpty({ message: 'Server name must not be empty' })
  name: string;

  @ApiProperty({
    description: 'URL of the server image (e.g., S3 image link)',
    example: 'https://example-bucket.s3.amazonaws.com/server-image.png',
  })
  @IsString()
  @IsUrl({}, { message: 'Server image must be a valid URL' })
  serverImage: string;

  @ApiProperty({
    description: 'UUID of the user creating the server',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'User ID must be a valid UUID' })
  userId: string;
}
