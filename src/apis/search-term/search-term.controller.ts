import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { CreateSearchTermDto } from './dto/create-search-term.dto';
import { SearchTermService } from './search-term.service';

@Controller('search-term')
export class SearchTermController {
  constructor(private readonly searchTermService: SearchTermService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateSearchTermDto) {
    return this.searchTermService.create(dto);
  }
}
