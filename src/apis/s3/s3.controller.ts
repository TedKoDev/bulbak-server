import { Controller, Post, Body } from '@nestjs/common';
import { z } from 'zod';
import { S3Service } from './s3.service';

export const presignedUrlSchema = z.object({
  key: z.string(),
  type: z.enum(['get', 'put']),
  contentType: z.string().optional(),
});

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('presigned-url')
  async getPresignedUrl(@Body() body: z.infer<typeof presignedUrlSchema>) {
    try {
      return await this.s3Service.generatePresignedUrl(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(JSON.stringify(error.errors));
      }
      console.error('Error generating presigned URL:', error);
      throw new Error('Failed to generate presigned URL');
    }
  }
}
