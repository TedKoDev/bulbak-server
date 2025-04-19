import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateSearchTermDto } from './dto/create-search-term.dto';

@Injectable()
export class SearchTermService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSearchTermDto) {
    const { platform, keyword, collectedAt, rank } = dto;

    // PortalSource 찾기 or 생성
    const source = await this.prisma.portalSource.upsert({
      where: { name: platform },
      update: {},
      create: { name: platform },
    });

    // SearchTerm 저장
    return this.prisma.searchTerm.create({
      data: {
        keyword,
        rank,
        collected_at: new Date(collectedAt),
        source: { connect: { id: source.id } },
      },
    });
  }
}
