import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsUrl,
  IsOptional,
} from 'class-validator';

export enum FileType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
}

export class CreateFileInstanceDto {
  @ApiProperty({
    description: 'Unique identifier for the file (generated on upload)',
    example: 'a3f2d59b-2a51-4a21-9c9e-1f2309f6e87b',
  })
  @IsString()
  @IsNotEmpty()
  fileId: string;

  @ApiProperty({
    description: 'Publicly accessible or presigned URL to access the file',
    example: 'https://s3.amazonaws.com/my-bucket/file-uuid.png',
  })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({
    description: 'S3 bucket where the file is stored',
    example: 'my-app-bucket',
  })
  @IsString()
  @IsNotEmpty()
  bucket: string;

  @ApiProperty({
    description: 'Type of the uploaded file',
    enum: FileType,
    example: FileType.IMAGE,
  })
  @IsEnum(FileType)
  type: FileType;

  @ApiProperty({
    description: 'UUID of the user who uploaded the file',
    example: 'c7e2b1f4-2a3a-4b3e-b7b0-1e0d8e9c9d2e',
  })
  @IsUUID()
  uploadedBy: string;

  @ApiProperty({
    description: 'Optional creation timestamp (auto-set by DB)',
    example: '2025-10-04T10:00:00.000Z',
    required: false,
  })
  @IsOptional()
  createdAt?: Date;
}
