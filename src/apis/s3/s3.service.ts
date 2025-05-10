import { Injectable } from '@nestjs/common';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { z } from 'zod';

const presignedUrlSchema = z.object({
  key: z.string(),
  type: z.enum(['get', 'put']),
  contentType: z.string().optional(),
});

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor() {
    this.s3Client = new S3Client({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
    this.bucket = process.env.AWS_S3_BUCKET_NAME || '';
  }

  async generatePresignedUrl(params: z.infer<typeof presignedUrlSchema>) {
    const { key, type, contentType } = presignedUrlSchema.parse(params);

    let command;
    if (type === 'get') {
      command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });
    } else {
      command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        ContentType: contentType,
      });
    }

    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 3600, // URL expires in 1 hour
    });

    console.log('signedUrl', signedUrl);
    return { url: signedUrl };
  }
}
