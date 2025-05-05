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
  constructor(private readonly interactions_service: InteractionsService) {}

  @Get('counts')
  async get_counts(
    @Query('target_type') target_type: TargetType,
    @Query('target_id') target_id: number,
  ): Promise<InteractionCountsDto> {
    console.log('=== get_counts called ===');
    console.log('Query params:', { target_type, target_id });
    return this.interactions_service.get_interaction_counts(
      target_type,
      target_id,
    );
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async get_user_interactions(
    @Query('target_type') target_type: TargetType,
    @Query('target_id') target_id: number,
    @Request() req,
  ) {
    console.log('=== get_user_interactions controller called ===');
    console.log('Query params:', { target_type, target_id });
    console.log('Request user:', req.user);

    if (!req.user?.id) {
      console.log('No user ID found in request');
      return {
        has_liked: false,
        has_disliked: false,
      };
    }

    return this.interactions_service.get_user_interactions(
      target_type,
      target_id,
      req.user.id,
    );
  }

  @Post('like')
  @UseGuards(JwtAuthGuard)
  async add_like(
    @Body() create_interaction_dto: CreateInteractionDto,
    @Request() req,
  ): Promise<InteractionResponseDto> {
    console.log('=== add_like called ===');
    console.log('Body:', create_interaction_dto);
    console.log('User:', req.user);
    return this.interactions_service.add_like(
      create_interaction_dto,
      req.user.id,
    );
  }

  @Delete('like')
  @UseGuards(JwtAuthGuard)
  async remove_like(
    @Query('target_type') target_type: TargetType,
    @Query('target_id') target_id: number,
    @Request() req,
  ): Promise<void> {
    console.log('=== remove_like called ===');
    console.log('Query params:', { target_type, target_id });
    console.log('User:', req.user);
    return this.interactions_service.remove_like(
      target_type,
      target_id,
      req.user.id,
    );
  }

  @Post('dislike')
  @UseGuards(JwtAuthGuard)
  async add_dislike(
    @Body() create_interaction_dto: CreateInteractionDto,
    @Request() req,
  ): Promise<InteractionResponseDto> {
    console.log('=== add_dislike called ===');
    console.log('Body:', create_interaction_dto);
    console.log('User:', req.user);
    return this.interactions_service.add_dislike(
      create_interaction_dto,
      req.user.id,
    );
  }

  @Delete('dislike')
  @UseGuards(JwtAuthGuard)
  async remove_dislike(
    @Query('target_type') target_type: TargetType,
    @Query('target_id') target_id: number,
    @Request() req,
  ): Promise<void> {
    console.log('=== remove_dislike called ===');
    console.log('Query params:', { target_type, target_id });
    console.log('User:', req.user);
    return this.interactions_service.remove_dislike(
      target_type,
      target_id,
      req.user.id,
    );
  }
}
