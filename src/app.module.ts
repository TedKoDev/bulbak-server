import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchTermModule } from './apis/search-term/search-term.module';
import { CrawlDataModule } from './apis/crawl-data/crawl-data.module';
import { KeywordModule } from './apis/keyword/keyword.module';
@Module({
  imports: [SearchTermModule, CrawlDataModule, KeywordModule], // 모듈 추가
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
