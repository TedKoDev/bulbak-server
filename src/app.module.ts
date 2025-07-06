import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchTermModule } from './apis/search-term/search-term.module';
import { CrawlDataModule } from './apis/crawl-data/crawl-data.module';
import { KeywordModule } from './apis/keyword/keyword.module';
import { AuthModule } from './apis/auth/auth.module';
import { UsersModule } from './apis/users/users.module';
import { HotIssuesModule } from './apis/hot-issues/hot-issues.module';
import { ToolsModule } from './apis/tools/tools.module';
import { ToolRequestsModule } from './apis/tool-requests/tool-requests.module';
import { SideHustlesModule } from './apis/side-hustles/side-hustles.module';
import { DevLogsModule } from './apis/dev-logs/dev-logs.module';
import { MarketDataModule } from './apis/market-data/market-data.module';
import { GlobalIssuesModule } from './apis/global-issues/global-issues.module';
import { MarketEventsModule } from './apis/market-events/market-events.module';
import { CommentsModule } from './apis/comments/comments.module';
import { InteractionsModule } from './apis/interactions/interactions.module';
import { BlogPostsModule } from './apis/blog-posts/blog-posts.module';
import { ViewsModule } from './apis/views/views.module';
import { S3Module } from './apis/s3/s3.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './common/prisma.service';
import { TagsModule } from './apis/tags/tags.module';
import { StocksModule } from './apis/stocks/stocks.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SearchTermModule,
    StocksModule,
    CrawlDataModule,
    KeywordModule,
    AuthModule,
    UsersModule,
    HotIssuesModule,
    ToolsModule,
    ToolRequestsModule,
    SideHustlesModule,
    DevLogsModule,
    MarketDataModule,
    GlobalIssuesModule,
    MarketEventsModule,
    CommentsModule,
    InteractionsModule,
    BlogPostsModule,
    ViewsModule,
    S3Module,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
