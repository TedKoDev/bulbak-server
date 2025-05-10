import { Module } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { BlogPostsController } from './blog-posts.controller';
import { PrismaService } from '../../common/prisma.service';
import { ViewsModule } from '../views/views.module';
import { InteractionsModule } from '../interactions/interactions.module';

@Module({
  imports: [ViewsModule, InteractionsModule],
  controllers: [BlogPostsController],
  providers: [BlogPostsService, PrismaService],
  exports: [BlogPostsService],
})
export class BlogPostsModule {}
