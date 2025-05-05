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

  async get_interaction_counts(
    target_type: TargetType,
    target_id: number,
  ): Promise<InteractionCountsDto> {
    const [likes, dislikes, comments] = await Promise.all([
      this.prisma.like.count({
        where: {
          target_type: target_type,
          target_id: target_id,
        },
      }),
      this.prisma.dislike.count({
        where: {
          target_type: target_type,
          target_id: target_id,
        },
      }),
      this.prisma.comment.count({
        where: {
          target_type: target_type,
          target_id: target_id,
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

  async get_interaction_counts_for_many(
    target_type: TargetType,
    target_ids: number[],
  ): Promise<Map<number, InteractionCountsDto>> {
    const [likes, dislikes, comments] = await Promise.all([
      this.prisma.like.groupBy({
        by: ['target_id'],
        where: {
          target_type: target_type,
          target_id: { in: target_ids },
        },
        _count: true,
      }),
      this.prisma.dislike.groupBy({
        by: ['target_id'],
        where: {
          target_type: target_type,
          target_id: { in: target_ids },
        },
        _count: true,
      }),
      this.prisma.comment.groupBy({
        by: ['target_id'],
        where: {
          target_type: target_type,
          target_id: { in: target_ids },
          deleted_at: null,
        },
        _count: true,
      }),
    ]);

    const result = new Map();

    target_ids.forEach((id) => {
      result.set(id, {
        likes: likes.find((l) => l.target_id === id)?._count || 0,
        dislikes: dislikes.find((d) => d.target_id === id)?._count || 0,
        comments: comments.find((c) => c.target_id === id)?._count || 0,
      });
    });

    return result;
  }

  async add_like(
    create_interaction_dto: CreateInteractionDto,
    user_id: number,
  ): Promise<InteractionResponseDto> {
    // 먼저 같은 대상에 대한 싫어요가 있다면 제거
    await this.prisma.dislike.deleteMany({
      where: {
        user_id: user_id,
        target_type: create_interaction_dto.target_type,
        target_id: create_interaction_dto.target_id,
      },
    });

    // 이미 좋아요가 있는지 확인
    const existing_like = await this.prisma.like.findFirst({
      where: {
        user_id: user_id,
        target_type: create_interaction_dto.target_type,
        target_id: create_interaction_dto.target_id,
      },
    });

    // 이미 좋아요가 있다면 삭제 (토글)
    if (existing_like) {
      await this.prisma.like.delete({
        where: {
          id: existing_like.id,
        },
      });
      return { ...existing_like, deleted: true };
    }

    // 좋아요 추가
    return this.prisma.like.create({
      data: {
        user_id: user_id,
        target_type: create_interaction_dto.target_type,
        target_id: create_interaction_dto.target_id,
      },
    });
  }

  async remove_like(
    target_type: TargetType,
    target_id: number,
    user_id: number,
  ): Promise<void> {
    await this.prisma.like.deleteMany({
      where: {
        user_id: user_id,
        target_type: target_type,
        target_id: target_id,
      },
    });
  }

  async add_dislike(
    create_interaction_dto: CreateInteractionDto,
    user_id: number,
  ): Promise<InteractionResponseDto> {
    // 먼저 같은 대상에 대한 좋아요가 있다면 제거
    await this.prisma.like.deleteMany({
      where: {
        user_id: user_id,
        target_type: create_interaction_dto.target_type,
        target_id: create_interaction_dto.target_id,
      },
    });

    // 이미 싫어요가 있는지 확인
    const existing_dislike = await this.prisma.dislike.findFirst({
      where: {
        user_id: user_id,
        target_type: create_interaction_dto.target_type,
        target_id: create_interaction_dto.target_id,
      },
    });

    // 이미 싫어요가 있다면 삭제 (토글)
    if (existing_dislike) {
      await this.prisma.dislike.delete({
        where: {
          id: existing_dislike.id,
        },
      });
      return { ...existing_dislike, deleted: true };
    }

    // 싫어요 추가
    return this.prisma.dislike.create({
      data: {
        user_id: user_id,
        target_type: create_interaction_dto.target_type,
        target_id: create_interaction_dto.target_id,
      },
    });
  }

  async remove_dislike(
    target_type: TargetType,
    target_id: number,
    user_id: number,
  ): Promise<void> {
    await this.prisma.dislike.deleteMany({
      where: {
        user_id: user_id,
        target_type: target_type,
        target_id: target_id,
      },
    });
  }

  async get_user_interactions(
    target_type: TargetType,
    target_id: number,
    user_id: number,
  ) {
    const [like, dislike] = await Promise.all([
      this.prisma.like.findFirst({
        where: {
          user_id: user_id,
          target_type: target_type,
          target_id: target_id,
        },
      }),
      this.prisma.dislike.findFirst({
        where: {
          user_id: user_id,
          target_type: target_type,
          target_id: target_id,
        },
      }),
    ]);

    return {
      has_liked: !!like,
      has_disliked: !!dislike,
    };
  }
}
