import { Module } from '@nestjs/common';
import { CrawlDataService } from './crawl-data.service';
import { CrawlDataController } from './crawl-data.controller';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [CrawlDataController],
  providers: [CrawlDataService, PrismaService],
})
export class CrawlDataModule {}
