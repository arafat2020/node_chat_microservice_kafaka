import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Config, UploadService } from '@node-chat/shared';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: UploadService,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const s3Config: S3Config = {
          region: config.getOrThrow('AWS_REGION'),
          accessKeyId: config.getOrThrow('AWS_ACCESS_KEY_ID'),
          secretAccessKey: config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
          bucketName: config.getOrThrow('AWS_BUCKET_NAME'),
        };
        return new UploadService(s3Config);
      },
    },
  ],
  exports: [UploadService],
})
export class LibModule {}
