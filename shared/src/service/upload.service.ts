// libs/shared/file/file.service.ts

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

export interface S3Config {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
}

export class UploadService {
  private s3Client: S3Client;

  constructor(private readonly config: S3Config) {
    this.s3Client = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  private sanitizeFileName(fileName: string): string {
    return fileName.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');
  }

  async uploadBuffer(buffer: Buffer, name: string, mimeType: string) {
    const sanitized = this.sanitizeFileName(name);
    const fileId = `${sanitized}-${uuidv4()}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.config.bucketName,
        Key: fileId,
        Body: buffer,
        ContentType: mimeType,
      }),
    );

    const url = await getSignedUrl(
      this.s3Client,
      new GetObjectCommand({
        Bucket: this.config.bucketName,
        Key: fileId,
      }),
      { expiresIn: 3600 * 24 * 7 },
    );

    return {
      fileId,
      url,
      name,
    };
  }
}
