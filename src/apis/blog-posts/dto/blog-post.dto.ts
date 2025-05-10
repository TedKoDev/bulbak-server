import { z } from 'zod';
import { PublishStatus } from '@prisma/client';

export const CreateBlogPostSchema = z.object({
  keyword_id: z.number(),
  blog_channel_id: z.number(),
  title: z.string(),
  content: z.string().optional(),
  publish_status: z.nativeEnum(PublishStatus).optional(),
  blog_type: z.string().optional(),
  tag_ids: z.array(z.number()).optional(),
});

export const UpdateBlogPostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  publish_status: z.nativeEnum(PublishStatus).optional(),
  blog_type: z.string().optional(),
  tag_ids: z.array(z.number()).optional(),
});

export type CreateBlogPostDto = z.infer<typeof CreateBlogPostSchema>;
export type UpdateBlogPostDto = z.infer<typeof UpdateBlogPostSchema>;

export type BlogPostResponseDto = {
  id: number;
  keyword_id: number;
  blog_channel_id: number;
  title: string;
  content: string | null;
  publish_status: PublishStatus;
  published_at: Date | null;
  blog_type: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  author?: {
    id: number;
    username: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
};
