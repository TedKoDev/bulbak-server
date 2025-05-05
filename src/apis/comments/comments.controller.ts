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
    @Query('target_type') target_type: TargetType,
    @Query('target_id') target_id: number,
  ): Promise<CommentResponseDto[]> {
    console.log('=== get CommentsController findAll called ===');
    console.log('Query params:', { target_type, target_id });
    return this.commentsService.findAll(target_type, target_id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommentResponseDto> {
    console.log('=== get CommentsController findOne called ===');
    console.log('Param:', { id });
    return this.commentsService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ): Promise<CommentResponseDto> {
    console.log('=== get CommentsController create called ===');
    console.log('Body:', createCommentDto);
    console.log('User:', req.user);
    return this.commentsService.create(createCommentDto, req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req,
  ): Promise<CommentResponseDto> {
    console.log('=== get CommentsController update called ===');
    console.log('Param:', { id });
    console.log('Body:', updateCommentDto);
    console.log('User:', req.user);
    return this.commentsService.update(+id, updateCommentDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    console.log('=== get CommentsController remove called ===');
    console.log('Param:', { id });
    console.log('User:', req.user);
    return this.commentsService.remove(+id, req.user.id);
  }
}
