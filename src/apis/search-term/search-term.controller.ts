import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateSearchTermDto } from './dto/create-search-term.dto';
import { SearchTermService } from './search-term.service';

@Controller('search-terms')
export class SearchTermController {
  constructor(private readonly searchTermService: SearchTermService) {}

  @Post()
  create(@Body() createSearchTermDto: CreateSearchTermDto) {
    return this.searchTermService.create(createSearchTermDto);
  }

  @Get()
  findAll() {
    return this.searchTermService.findAll();
  }
}
