// src/scheduler/keyword.runner.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { KeywordService } from '../keyword/keyword.service';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const keywordService = app.get(KeywordService);

  console.log('🚀 Running scheduled keyword generation...');

  // 1. 실시간 검색어 및 일반 기사 기반
  await keywordService.generateKeywordsFromRecentData();

  // 2. 정책 관련 크롤링 기사 기반
  await keywordService.generateKeywordsFromCrawledType('ARTICLE', 24);

  // 3. 채용공고 기반 (최근 48시간)
  await keywordService.generateKeywordsFromCrawledType('JOB', 48);

  await app.close();
  console.log('✅ Keyword generation complete');
}

run().catch((err) => {
  console.error('❌ Scheduler failed:', err);
});
