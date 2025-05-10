import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './tags.service';
import { TargetType } from '@prisma/client';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get('search')
  findByName(@Query('name') name: string) {
    return this.tagsService.findByName(name);
  }

  @Get('target/:type/:id')
  findByTarget(@Param('type') type: TargetType, @Param('id') id: string) {
    return this.tagsService.findByTarget(type, parseInt(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }

  @Post('target/:type/:id')
  addTagsToTarget(
    @Param('type') type: TargetType,
    @Param('id') id: string,
    @Body('tags') tagNames: string[],
  ) {
    return this.tagsService.addTagsToTarget(type, parseInt(id), tagNames);
  }

  @Delete('target/:type/:id')
  removeTagsFromTarget(
    @Param('type') type: TargetType,
    @Param('id') id: string,
    @Body('tagIds') tagIds: number[],
  ) {
    return this.tagsService.removeTagsFromTarget(type, parseInt(id), tagIds);
  }
}
