import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  CreateCommentDto,
  UpdateCommentDto,
  CommentResponseDto,
} from './dto/comment.dto';
import { TargetType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(
    @Query('targetType') targetType: TargetType,
    @Query('targetId') targetId: number,
  ): Promise<CommentResponseDto[]> {
    return this.commentsService.findAll(targetType, targetId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommentResponseDto> {
    return this.commentsService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ): Promise<CommentResponseDto> {
    return this.commentsService.create(createCommentDto, req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req,
  ): Promise<CommentResponseDto> {
    return this.commentsService.update(+id, updateCommentDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.commentsService.remove(+id, req.user.id);
  }
}
