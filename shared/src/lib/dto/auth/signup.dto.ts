import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User password',
    example: 'SecurePassword123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'User profile image URL',
    example: 'https://example.com/avatars/user123.jpg',
  })
  @IsString()
  @IsOptional()
  imgUrl?: string;

  @ApiProperty({
    description: 'Unique user identifier',
    example: 'usr_1a2b3c4d5e6f',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}