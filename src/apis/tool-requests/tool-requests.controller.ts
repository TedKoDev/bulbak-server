import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ToolRequestsService } from './tool-requests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/tool-requests')
export class ToolRequestsController {
  constructor(private readonly toolRequestsService: ToolRequestsService) {}

  @Get()
  findAll() {
    return this.toolRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolRequestsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createToolRequestDto: any, @Req() req) {
    return this.toolRequestsService.create(createToolRequestDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateToolRequestDto: any) {
    return this.toolRequestsService.update(id, updateToolRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/vote')
  vote(@Param('id') id: string) {
    return this.toolRequestsService.vote(id);
  }
}
