// src/apis/keyword/keyword.controller.ts
import { Controller, Post, Body, HttpCode, Patch, Param } from '@nestjs/common';
import { CreateKeywordDto, KeywordStatus } from './dto/create-keyword.dto';
import { KeywordService } from './keyword.service';

@Controller('keywords')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateKeywordDto) {
    return this.keywordService.createKeyword(dto);
  }

  /**
   * 최근 1시간 내 수집된 검색어와 기사 기반 자동 키워드 생성 (SearchTerm + CrawledData)
   */
  @Post('generate/recent')
  async generateFromRecent() {
    return this.keywordService.generateKeywordsFromRecentData();
  }

  /**
   * 크롤링된 데이터 중 특정 유형(ARTICLE/JOB/RAW) 기반 키워드 생성
   * (기본: 최근 24시간, 사용자가 요청한 경우 시간 범위도 함께 처리 가능)
   */
  @Post('generate/crawled')
  async generateFromCrawled(
    @Body() body: { type: 'ARTICLE' | 'JOB' | 'RAW'; hours?: number },
  ) {
    const { type, hours = 24 } = body;
    return this.keywordService.generateKeywordsFromCrawledType(type, hours);
  }

  /**
   * 키워드 상태 수동 업데이트 (PENDING → SELECTED/REJECTED)
   */

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body() body: { status: 'PENDING' | 'SELECTED' | 'REJECTED' },
  ) {
    const status = KeywordStatus[body.status as keyof typeof KeywordStatus];
    return this.keywordService.updateStatus(Number(id), status);
  }
  /**
   * 수동 키워드 직접 입력을 위한 API (단일 입력)
   */
  @Post('manual')
  async createManualKeyword(@Body() dto: { text: string; priority?: number }) {
    return this.keywordService.createKeyword({
      text: dto.text,
      priority: dto.priority ?? 0,
      status: KeywordStatus.SELECTED,
    });
  }
}
