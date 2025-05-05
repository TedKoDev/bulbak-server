import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import {
  CreateBlogPostDto,
  UpdateBlogPostDto,
  BlogPostResponseDto,
} from './dto/blog-post.dto';
import { PublishStatus, TargetType } from '@prisma/client';
import { ViewsService } from '../views/views.service';

@Injectable()
export class BlogPostsService {
  constructor(
    private prisma: PrismaService,
    private views_service: ViewsService,
  ) {}

  async create(
    create_blog_post_dto: CreateBlogPostDto,
  ): Promise<BlogPostResponseDto> {
    return this.prisma.blogPost.create({
      data: {
        ...create_blog_post_dto,
        publish_status:
          create_blog_post_dto.publish_status || PublishStatus.PENDING,
      },
    });
  }

  async findAll(): Promise<(BlogPostResponseDto & { view_count: number })[]> {
    const posts = await this.prisma.blogPost.findMany({
      where: {
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const view_counts = await this.views_service.getViewCountsForMany(
      TargetType.BLOG_POST,
      posts.map((post) => post.id),
    );

    return posts.map((post) => ({
      ...post,
      view_count: view_counts.get(post.id) || 0,
    }));
  }

  async findOne(
    id: number,
  ): Promise<BlogPostResponseDto & { view_count: number }> {
    const post = await this.prisma.blogPost.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });

    if (!post) {
      return null;
    }

    const view_count = await this.views_service.getViewCount(
      TargetType.BLOG_POST,
      id,
    );

    return {
      ...post,
      view_count,
    };
  }

  async update(
    id: number,
    update_blog_post_dto: UpdateBlogPostDto,
  ): Promise<BlogPostResponseDto> {
    return this.prisma.blogPost.update({
      where: { id },
      data: {
        ...update_blog_post_dto,
        updated_at: new Date(),
      },
    });
  }

  async remove(id: number): Promise<BlogPostResponseDto> {
    return this.prisma.blogPost.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async findByKeyword(
    keyword_id: number,
  ): Promise<(BlogPostResponseDto & { view_count: number })[]> {
    const posts = await this.prisma.blogPost.findMany({
      where: {
        keyword_id,
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const view_counts = await this.views_service.getViewCountsForMany(
      TargetType.BLOG_POST,
      posts.map((post) => post.id),
    );

    return posts.map((post) => ({
      ...post,
      view_count: view_counts.get(post.id) || 0,
    }));
  }

  async findByBlogChannel(
    blog_channel_id: number,
  ): Promise<(BlogPostResponseDto & { view_count: number })[]> {
    const posts = await this.prisma.blogPost.findMany({
      where: {
        blog_channel_id,
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const view_counts = await this.views_service.getViewCountsForMany(
      TargetType.BLOG_POST,
      posts.map((post) => post.id),
    );

    return posts.map((post) => ({
      ...post,
      view_count: view_counts.get(post.id) || 0,
    }));
  }
}
