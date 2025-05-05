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
  ParseIntPipe,
} from '@nestjs/common';
import { DevLogsService } from './dev-logs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateDevLogDto, UpdateDevLogDto } from './dto/devlog-dto';

@Controller('dev-logs')
export class DevLogsController {
  constructor(private readonly devLogsService: DevLogsService) {}

  @Get()
  findAll() {
    console.log('findAll');
    return this.devLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.devLogsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDevLogDto: CreateDevLogDto, @Req() req) {
    console.log('create');
    console.log(req.user);
    console.log(createDevLogDto);
    console.log(createDevLogDto.title);
    console.log(createDevLogDto.date);
    console.log(createDevLogDto.summary);
    console.log(createDevLogDto.content);
    console.log(createDevLogDto.category);
    return this.devLogsService.create(createDevLogDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDevLogDto: UpdateDevLogDto,
    @Req() req,
  ) {
    return this.devLogsService.update(id, updateDevLogDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.devLogsService.remove(id, req.user.id);
  }
}
