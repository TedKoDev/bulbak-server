import { Body, Controller, Post, HttpCode, Get, Put } from '@nestjs/common';
import { CreateCrawledDataDto } from './dto/create-crawl-data.dto';
import { CheckCrawledDataDto } from './dto/check-crawl-data.dto';
import { UpdateCrawledDataDto } from './dto/update-crawl-data.dto';
import { CrawlDataService } from './crawl-data.service';

@Controller('crawl-data')
export class CrawlDataController {
  constructor(private readonly crawlDataService: CrawlDataService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateCrawledDataDto) {
    return this.crawlDataService.create(dto);
  }

  @Get('check')
  @HttpCode(200)
  check(@Body() dto: CheckCrawledDataDto) {
    return this.crawlDataService.checkByUrl(dto);
  }

  @Put()
  @HttpCode(200)
  update(@Body() dto: UpdateCrawledDataDto) {
    return this.crawlDataService.update(dto);
  }
}
