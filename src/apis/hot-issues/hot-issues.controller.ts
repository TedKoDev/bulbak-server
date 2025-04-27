import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
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
  findOne(@Param('id') id: string) {
    return this.hotIssuesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createHotIssueDto: any) {
    return this.hotIssuesService.create(createHotIssueDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateHotIssueDto: any) {
    return this.hotIssuesService.update(id, updateHotIssueDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotIssuesService.remove(id);
  }
}
