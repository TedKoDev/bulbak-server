import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { HotIssuesService } from './hot-issues.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/hot-issues')
export class HotIssuesController {
  constructor(private readonly hotIssuesService: HotIssuesService) {}

  @Get()
  findAll() {
    return this.hotIssuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hotIssuesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createHotIssueDto: any) {
    return this.hotIssuesService.create(createHotIssueDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHotIssueDto: any,
  ) {
    return this.hotIssuesService.update(id, updateHotIssueDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hotIssuesService.remove(id);
  }
}
