import {
  ArgumentMetadata,
  BadRequestException,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { ZodType } from 'zod';

export class ZodPipe implements PipeTransform {
  private logger = new Logger(ZodPipe.name);
  constructor(private schema: ZodType) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    this.logger.debug('Meta Data form zod pipe:\n' + metadata.data);
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException(
        'Validation failed' +
          (error instanceof Error ? `: \n${error.message}` : '')
      );
    }
  }
}
