import { Body, Controller, Post } from '@nestjs/common';
import { CreateSearchTermDto } from './dto/create-search-term.dto';
import { SearchTermService } from './search-term.service';

@Controller('search-term')
export class SearchTermController {
  constructor(private readonly searchTermService: SearchTermService) {}

  @Post()
  create(@Body() dto: CreateSearchTermDto) {
    return this.searchTermService.create(dto);
  }
}
