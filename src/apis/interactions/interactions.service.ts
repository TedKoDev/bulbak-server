import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { TargetType } from '@prisma/client';
import {
  CreateInteractionDto,
  InteractionResponseDto,
  InteractionCountsDto,
} from './dto/interaction.dto';

@Injectable()
export class InteractionsService {
  constructor(private prisma: PrismaService) {}

  async getInteractionCounts(
    targetType: TargetType,
    targetId: number,
  ): Promise<InteractionCountsDto> {
    const [likes, dislikes, comments] = await Promise.all([
      this.prisma.like.count({
        where: {
          target_type: targetType,
          target_id: targetId,
        },
      }),
      this.prisma.dislike.count({
        where: {
          target_type: targetType,
          target_id: targetId,
        },
      }),
      this.prisma.comment.count({
        where: {
          target_type: targetType,
          target_id: targetId,
          deleted_at: null,
        },
      }),
    ]);

    return {
      likes,
      dislikes,
      comments,
    };
  }

  async getInteractionCountsForMany(
    targetType: TargetType,
    targetIds: number[],
  ): Promise<Map<number, InteractionCountsDto>> {
    const [likes, dislikes, comments] = await Promise.all([
      this.prisma.like.groupBy({
        by: ['target_id'],
        where: {
          target_type: targetType,
          target_id: { in: targetIds },
        },
        _count: true,
      }),
      this.prisma.dislike.groupBy({
        by: ['target_id'],
        where: {
          target_type: targetType,
          target_id: { in: targetIds },
        },
        _count: true,
      }),
      this.prisma.comment.groupBy({
        by: ['target_id'],
        where: {
          target_type: targetType,
          target_id: { in: targetIds },
          deleted_at: null,
        },
        _count: true,
      }),
    ]);

    const result = new Map();

    targetIds.forEach((id) => {
      result.set(id, {
        likes: likes.find((l) => l.target_id === id)?._count || 0,
        dislikes: dislikes.find((d) => d.target_id === id)?._count || 0,
        comments: comments.find((c) => c.target_id === id)?._count || 0,
      });
    });

    return result;
  }

  async addLike(
    createInteractionDto: CreateInteractionDto,
    userId: number,
  ): Promise<InteractionResponseDto> {
    // 먼저 같은 대상에 대한 싫어요가 있다면 제거
    await this.prisma.dislike.deleteMany({
      where: {
        user_id: userId,
        target_type: createInteractionDto.target_type,
        target_id: createInteractionDto.target_id,
      },
    });

    // 좋아요 추가
    return this.prisma.like.create({
      data: {
        user_id: userId,
        target_type: createInteractionDto.target_type,
        target_id: createInteractionDto.target_id,
      },
    });
  }

  async removeLike(
    targetType: TargetType,
    targetId: number,
    userId: number,
  ): Promise<void> {
    await this.prisma.like.deleteMany({
      where: {
        user_id: userId,
        target_type: targetType,
        target_id: targetId,
      },
    });
  }

  async addDislike(
    createInteractionDto: CreateInteractionDto,
    userId: number,
  ): Promise<InteractionResponseDto> {
    // 먼저 같은 대상에 대한 좋아요가 있다면 제거
    await this.prisma.like.deleteMany({
      where: {
        user_id: userId,
        target_type: createInteractionDto.target_type,
        target_id: createInteractionDto.target_id,
      },
    });

    // 싫어요 추가
    return this.prisma.dislike.create({
      data: {
        user_id: userId,
        target_type: createInteractionDto.target_type,
        target_id: createInteractionDto.target_id,
      },
    });
  }

  async removeDislike(
    targetType: TargetType,
    targetId: number,
    userId: number,
  ): Promise<void> {
    await this.prisma.dislike.deleteMany({
      where: {
        user_id: userId,
        target_type: targetType,
        target_id: targetId,
      },
    });
  }

  async getUserInteractions(
    targetType: TargetType,
    targetId: number,
    userId: number,
  ) {
    const [like, dislike] = await Promise.all([
      this.prisma.like.findFirst({
        where: {
          user_id: userId,
          target_type: targetType,
          target_id: targetId,
        },
      }),
      this.prisma.dislike.findFirst({
        where: {
          user_id: userId,
          target_type: targetType,
          target_id: targetId,
        },
      }),
    ]);

    return {
      hasLiked: !!like,
      hasDisliked: !!dislike,
    };
  }
}
