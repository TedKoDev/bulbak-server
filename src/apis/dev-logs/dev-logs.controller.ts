import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DevLogsService } from './dev-logs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/dev-logs')
export class DevLogsController {
  constructor(private readonly devLogsService: DevLogsService) {}

  @Get()
  findAll() {
    return this.devLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.devLogsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDevLogDto: any, @Req() req) {
    return this.devLogsService.create(createDevLogDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateDevLogDto: any, @Req() req) {
    return this.devLogsService.update(id, updateDevLogDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    return this.devLogsService.remove(id, req.user.id);
  }
}
