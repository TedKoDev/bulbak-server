import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateSearchTermDto } from './dto/create-search-term.dto';
import { SearchTermResponseDto } from './dto/search-term.response.dto';

@Injectable()
export class SearchTermService {
  private readonly logger = new Logger(SearchTermService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSearchTermDto) {
    const { platform, keyword, rank, collectedAt } = dto;

    if (!platform) {
      this.logger.error('Platform is required');
      throw new Error('Platform is required');
    }

    try {
      // PortalSource 찾기 or 생성
      const source = await this.prisma.portalSource.upsert({
        where: { name: platform },
        update: {},
        create: { name: platform },
      });

      // SearchTerm 저장
      return await this.prisma.searchTerm.create({
        data: {
          keyword,
          rank,
          collected_at: new Date(collectedAt),
          source_id: source.id,
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to create search term: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(): Promise<SearchTermResponseDto[]> {
    const sources = await this.prisma.portalSource.findMany();
    const results = await Promise.all(
      sources.map(async (source) => {
        const searchTerms = await this.prisma.searchTerm.findMany({
          where: {
            source_id: source.id,
          },
          orderBy: {
            collected_at: 'desc',
          },
          take: 10,
          include: {
            source: true,
          },
        });
        return searchTerms;
      }),
    );
    return results.flat();
  }
}
