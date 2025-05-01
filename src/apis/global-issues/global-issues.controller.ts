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
import { GlobalIssuesService } from './global-issues.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/global-issues')
export class GlobalIssuesController {
  constructor(private readonly globalIssuesService: GlobalIssuesService) {}

  @Get()
  findAll() {
    return this.globalIssuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.globalIssuesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createGlobalIssueDto: any) {
    return this.globalIssuesService.create(createGlobalIssueDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGlobalIssueDto: any,
  ) {
    return this.globalIssuesService.update(id, updateGlobalIssueDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.globalIssuesService.remove(id);
  }
}
