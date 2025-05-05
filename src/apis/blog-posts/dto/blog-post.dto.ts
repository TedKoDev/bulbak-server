import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { PublishStatus } from '@prisma/client';

export class CreateBlogPostDto {
  @IsNumber()
  keyword_id: number;

  @IsNumber()
  blog_channel_id: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(PublishStatus)
  @IsOptional()
  publish_status?: PublishStatus;

  @IsString()
  @IsOptional()
  blog_type?: string;
}

export class UpdateBlogPostDto extends CreateBlogPostDto {}

export class BlogPostResponseDto {
  id: number;
  keyword_id: number;
  blog_channel_id: number;
  title: string;
  content?: string;
  publish_status: PublishStatus;
  published_at?: Date;
  blog_type?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  view_count: number;
}
