import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import {
  CreateBlogPostDto,
  UpdateBlogPostDto,
  BlogPostResponseDto,
} from './dto/blog-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blog_posts_service: BlogPostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() create_blog_post_dto: CreateBlogPostDto,
  ): Promise<BlogPostResponseDto> {
    return this.blog_posts_service.create(create_blog_post_dto);
  }

  @Get()
  findAll(): Promise<BlogPostResponseDto[]> {
    return this.blog_posts_service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BlogPostResponseDto> {
    return this.blog_posts_service.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() update_blog_post_dto: UpdateBlogPostDto,
  ): Promise<BlogPostResponseDto> {
    return this.blog_posts_service.update(+id, update_blog_post_dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<BlogPostResponseDto> {
    return this.blog_posts_service.remove(+id);
  }

  @Get('keyword/:keyword_id')
  findByKeyword(
    @Param('keyword_id') keyword_id: string,
  ): Promise<BlogPostResponseDto[]> {
    return this.blog_posts_service.findByKeyword(+keyword_id);
  }

  @Get('channel/:blog_channel_id')
  findByBlogChannel(
    @Param('blog_channel_id') blog_channel_id: string,
  ): Promise<BlogPostResponseDto[]> {
    return this.blog_posts_service.findByBlogChannel(+blog_channel_id);
  }
}
