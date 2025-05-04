import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import {
  CreateInteractionDto,
  InteractionResponseDto,
  InteractionCountsDto,
} from './dto/interaction.dto';
import { TargetType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Get('counts')
  async getCounts(
    @Query('targetType') targetType: TargetType,
    @Query('targetId') targetId: number,
  ): Promise<InteractionCountsDto> {
    return this.interactionsService.getInteractionCounts(targetType, targetId);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUserInteractions(
    @Query('targetType') targetType: TargetType,
    @Query('targetId') targetId: number,
    @Request() req,
  ) {
    return this.interactionsService.getUserInteractions(
      targetType,
      targetId,
      req.user.id,
    );
  }

  @Post('like')
  @UseGuards(JwtAuthGuard)
  async addLike(
    @Body() createInteractionDto: CreateInteractionDto,
    @Request() req,
  ): Promise<InteractionResponseDto> {
    return this.interactionsService.addLike(createInteractionDto, req.user.id);
  }

  @Delete('like')
  @UseGuards(JwtAuthGuard)
  async removeLike(
    @Query('targetType') targetType: TargetType,
    @Query('targetId') targetId: number,
    @Request() req,
  ): Promise<void> {
    return this.interactionsService.removeLike(
      targetType,
      targetId,
      req.user.id,
    );
  }

  @Post('dislike')
  @UseGuards(JwtAuthGuard)
  async addDislike(
    @Body() createInteractionDto: CreateInteractionDto,
    @Request() req,
  ): Promise<InteractionResponseDto> {
    return this.interactionsService.addDislike(
      createInteractionDto,
      req.user.id,
    );
  }

  @Delete('dislike')
  @UseGuards(JwtAuthGuard)
  async removeDislike(
    @Query('targetType') targetType: TargetType,
    @Query('targetId') targetId: number,
    @Request() req,
  ): Promise<void> {
    return this.interactionsService.removeDislike(
      targetType,
      targetId,
      req.user.id,
    );
  }
}
