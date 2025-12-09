import { IsNotEmpty, IsUUID } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function UUIDField(description: string, example: string) {
  return applyDecorators(
    IsUUID(),
    IsNotEmpty({ message: `${description} must be a valid UUID` }),
    ApiProperty({ description, example }),
  );
}
