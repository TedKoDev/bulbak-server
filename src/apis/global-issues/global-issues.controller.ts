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
  findOne(@Param('id') id: string) {
    return this.globalIssuesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createGlobalIssueDto: any) {
    return this.globalIssuesService.create(createGlobalIssueDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateGlobalIssueDto: any) {
    return this.globalIssuesService.update(id, updateGlobalIssueDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalIssuesService.remove(id);
  }
}
