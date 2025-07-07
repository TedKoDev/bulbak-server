// src/apis/keyword/keyword.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateKeywordDto, KeywordStatus } from './dto/create-keyword.dto';
import { normalizeText } from './utils/normalize';
import { subHours } from 'date-fns';
import type { DataType } from '@prisma/client';

@Injectable()
export class KeywordService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 주어진 데이터로 새 키워드를 생성하고, 관련된 SearchTerm 및 CrawledData 항목과 연결합니다.
   * @param dto CreateKeywordDto: 키워드 생성 요청 데이터
   * @returns 생성된 Keyword 레코드
   */
  async createKeyword(dto: CreateKeywordDto) {
    // 키워드 엔티티 생성
    const keyword = await this.prisma.keyword.create({
      data: {
        text: dto.text,
        status: dto.status || KeywordStatus.PENDING,
        priority: dto.priority || 0,
        prompt_id: dto.prompt_id ?? null,
      },
    });

    // SearchTerm 연동 테이블 저장 (N:N 관계)
    if (dto.sourceSearchTermIds?.length) {
      await this.prisma.searchTermKeywordLink.createMany({
        data: dto.sourceSearchTermIds.map((id) => ({
          search_term_id: id,
          keyword_id: keyword.id,
        })),
      });
    }

    // CrawledData 연동 테이블 저장 (N:N 관계)
    if (dto.sourceCrawledDataIds?.length) {
      await this.prisma.crawledDataKeywordLink.createMany({
        data: dto.sourceCrawledDataIds.map((id) => ({
          crawled_data_id: id,
          keyword_id: keyword.id,
        })),
      });
    }

    return keyword;
  }

  /**
   * 최근 1시간 이내 수집된 SearchTerm / CrawledData를 기반으로 유사 키워드 그룹을 만들고
   * 대표 키워드를 추출하여 DB에 저장합니다.
   * @returns 생성된 키워드 목록 배열
   */
  async generateKeywordsFromRecentData() {
    const oneHourAgo = subHours(new Date(), 1);

    const [terms, crawls] = await Promise.all([
      this.prisma.searchTerm.findMany({
        where: { collected_at: { gte: oneHourAgo }, deleted_at: null },
      }),
      this.prisma.crawledData.findMany({
        where: { collected_at: { gte: oneHourAgo }, deleted_at: null },
      }),
    ]);

    const map = new Map<
      string,
      {
        text: string;
        sourceSearchTermIds: number[];
        sourceCrawledDataIds: number[];
      }
    >();

    for (const term of terms) {
      const norm = normalizeText(term.keyword);
      if (!map.has(norm)) {
        map.set(norm, {
          text: term.keyword,
          sourceSearchTermIds: [],
          sourceCrawledDataIds: [],
        });
      }
      map.get(norm)!.sourceSearchTermIds.push(term.id);
    }

    for (const crawl of crawls) {
      const text = `${crawl.title ?? ''} ${crawl.content ?? ''}`;
      const norm = normalizeText(text);
      if (!map.has(norm)) {
        map.set(norm, {
          text,
          sourceSearchTermIds: [],
          sourceCrawledDataIds: [],
        });
      }
      map.get(norm)!.sourceCrawledDataIds.push(crawl.id);
    }

    const created = [];
    for (const [, group] of map) {
      const keyword = await this.createKeyword({
        text: group.text,
        sourceSearchTermIds: group.sourceSearchTermIds,
        sourceCrawledDataIds: group.sourceCrawledDataIds,
        status: KeywordStatus.PENDING,
      });
      created.push(keyword);
    }

    return created;
  }

  /**
   * 특정 유형의 CrawledData만 기반으로 키워드를 생성합니다.
   * 예: 정부지원 정책, 채용공고 등 유형별 처리
   * @param type CrawledData의 유형 (ARTICLE, JOB, RAW)
   * @param hours 몇 시간 내 데이터까지 포함할지 (기본 24시간)
   * @returns 생성된 키워드 배열
   */
  async generateKeywordsFromCrawledType(type: DataType, hours = 24) {
    const from = subHours(new Date(), hours);

    const crawls = await this.prisma.crawledData.findMany({
      where: {
        collected_at: { gte: from },
        deleted_at: null,
        type,
      },
    });

    const map = new Map<
      string,
      {
        text: string;
        sourceCrawledDataIds: number[];
      }
    >();

    for (const crawl of crawls) {
      const text = `${crawl.title ?? ''} ${crawl.content ?? ''}`;
      const norm = normalizeText(text);
      if (!map.has(norm)) {
        map.set(norm, {
          text,
          sourceCrawledDataIds: [],
        });
      }
      map.get(norm)!.sourceCrawledDataIds.push(crawl.id);
    }

    const created = [];
    for (const [, group] of map) {
      const keyword = await this.createKeyword({
        text: group.text,
        sourceCrawledDataIds: group.sourceCrawledDataIds,
        status: KeywordStatus.PENDING,
      });
      created.push(keyword);
    }

    return created;
  }
  // src/apis/keyword/keyword.service.ts
  async updateStatus(id: number, status: KeywordStatus) {
    return this.prisma.keyword.update({
      where: { id },
      data: { status },
    });
  }
}
