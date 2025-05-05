import { Module } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { BlogPostsController } from './blog-posts.controller';
import { PrismaService } from '../../common/prisma.service';
import { ViewsModule } from '../views/views.module';

@Module({
  imports: [ViewsModule],
  controllers: [BlogPostsController],
  providers: [BlogPostsService, PrismaService],
  exports: [BlogPostsService],
})
export class BlogPostsModule {}
