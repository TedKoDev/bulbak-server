// src/apis/scheduler/scheduler.service.ts
import { Injectable, Logger } from '@nestjs/common';
import cron from 'node-cron';
import { KeywordService } from '../keyword/keyword.service';

@Injectable()
export class SchedulerService {
  private task: cron.ScheduledTask | null = null;
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly keywordService: KeywordService) {}

  start() {
    if (this.task) {
      this.logger.warn('🚫 크론 작업이 이미 실행 중입니다.');
      return 'Already running';
    }

    this.task = cron.schedule('0 * * * *', async () => {
      this.logger.log('⏰ 매시 정각 키워드 생성 시작');
      await this.keywordService.generateKeywordsFromRecentData();
      await this.keywordService.generateKeywordsFromCrawledType('ARTICLE', 24);
      await this.keywordService.generateKeywordsFromCrawledType('JOB', 48);
    });

    this.task.start();
    this.logger.log('✅ 크론 스케줄러 시작됨');
    return 'Started';
  }

  stop() {
    if (!this.task) {
      this.logger.warn('⛔️ 실행 중인 작업이 없습니다.');
      return 'Nothing to stop';
    }
    this.task.stop();
    this.task = null;
    this.logger.log('🛑 크론 스케줄러 중단됨');
    return 'Stopped';
  }
}
