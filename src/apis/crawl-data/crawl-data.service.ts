// src/apis/crawl-data/crawl-data.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateCrawledDataDto } from './dto/create-crawl-data.dto';
import { CheckCrawledDataDto } from './dto/check-crawl-data.dto';
import { UpdateCrawledDataDto } from './dto/update-crawl-data.dto';

@Injectable()
export class CrawlDataService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCrawledDataDto) {
    return this.prisma.crawledData.create({
      data: {
        site: dto.site,
        url: dto.url,
        type: dto.type,
        title: dto.title,
        content: dto.content,
      },
    });
  }

  async checkByUrl(dto: CheckCrawledDataDto) {
    const data = await this.prisma.crawledData.findFirst({
      where: { url: dto.url },
    });
    return { exists: !!data };
  }

  async update(dto: UpdateCrawledDataDto) {
    const existingData = await this.prisma.crawledData.findFirst({
      where: { url: dto.url },
    });

    if (!existingData) {
      throw new NotFoundException('Crawled data not found');
    }

    return this.prisma.crawledData.update({
      where: { id: existingData.id },
      data: {
        title: dto.title,
        content: dto.content,
      },
    });
  }
}
