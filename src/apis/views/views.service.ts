import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateViewDto, ViewResponseDto } from './dto/view.dto';
import { TargetType } from '@prisma/client';

@Injectable()
export class ViewsService {
  constructor(private prisma: PrismaService) {}

  async create(create_view_dto: CreateViewDto): Promise<ViewResponseDto> {
    return this.prisma.view.create({
      data: create_view_dto,
    });
  }

  async getViewCount(
    target_type: TargetType,
    target_id: number,
  ): Promise<number> {
    return this.prisma.view.count({
      where: {
        target_type,
        target_id,
      },
    });
  }

  async getViewCountsForMany(
    target_type: TargetType,
    target_ids: number[],
  ): Promise<Map<number, number>> {
    const views = await this.prisma.view.groupBy({
      by: ['target_id'],
      where: {
        target_type,
        target_id: { in: target_ids },
      },
      _count: true,
    });

    const result = new Map();
    target_ids.forEach((id) => {
      result.set(id, views.find((v) => v.target_id === id)?._count || 0);
    });

    return result;
  }
}
