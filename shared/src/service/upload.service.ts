import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

export interface S3Config {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  defaultExpirySeconds?: number;
}

export enum FileType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
}

export interface UploadedFileInfo {
  fileId: string;
  path: string;
  bucket: string;
  type: FileType;
  uploadedBy: string;
  url: string;
  name: string;
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

  /**
   * Uploads a file buffer directly to S3 and returns Prisma-compatible data.
   */
  async uploadBuffer(
    buffer: Buffer,
    name: string,
    mimeType: string,
    options: {
      folder?: string;
      type: FileType;
      uploadedBy: string;
      expiresIn?: number;
    },
  ): Promise<UploadedFileInfo> {
    const sanitized = this.sanitizeFileName(name);
    const fileId = `${sanitized}-${uuidv4()}`;
    const folder = options.folder ? `${options.folder}/` : '';
    const key = `${folder}${fileId}`;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.config.bucketName,
          Key: key,
          Body: buffer,
          ContentType: mimeType,
        }),
      );

      const url = await getSignedUrl(
        this.s3Client,
        new GetObjectCommand({
          Bucket: this.config.bucketName,
          Key: key,
        }),
        {
          expiresIn:
            options.expiresIn ??
            this.config.defaultExpirySeconds ??
            604800, // 7 days
        },
      );

      return {
        fileId,
        path: key,
        bucket: this.config.bucketName,
        type: options.type,
        uploadedBy: options.uploadedBy,
        url,
        name,
      };
    } catch (err) {
      console.error('❌ Failed to upload to S3:', err);
      throw err;
    }
  }

  /**
   * Generates a presigned URL for client-side upload.
   */
  async generatePresignedUploadUrl(
    fileName: string,
    mimeType: string,
    options: {
      folder?: string;
      type: FileType;
      uploadedBy: string;
      expiresIn?: number;
    },
  ) {
    const sanitized = this.sanitizeFileName(fileName);
    const fileId = `${sanitized}-${uuidv4()}`;
    const folder = options.folder ? `${options.folder}/` : '';
    const key = `${folder}${fileId}`;

    const uploadUrl = await getSignedUrl(
      this.s3Client,
      new PutObjectCommand({
        Bucket: this.config.bucketName,
        Key: key,
        ContentType: mimeType,
      }),
      { expiresIn: options.expiresIn ?? 3600 },
    );

    return {
      fileId,
      uploadUrl,
      path: key,
      bucket: this.config.bucketName,
      type: options.type,
      uploadedBy: options.uploadedBy,
      expiresIn: options.expiresIn ?? 3600,
    };
  }

  /**
   * Get a presigned download URL for an existing file.
   */
  async getPresignedDownloadUrl(
    path: string,
    expiresIn = 3600 * 24,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.config.bucketName,
      Key: path,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  /**
   * Rollback helper — delete file from S3.
   * Call this if DB transaction fails after upload.
   */
  async rollback(filePath: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.config.bucketName,
          Key: filePath,
        }),
      );
      console.log(`🧹 Rolled back S3 file: ${filePath}`);
    } catch (err) {
      console.error('❌ Failed to rollback S3 object:', err);
    }
  }
}
