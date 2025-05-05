import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { InteractionsService } from '../interactions/interactions.service';
import { TargetType } from '@prisma/client';

@Injectable()
export class DevLogsService {
  constructor(
    private prisma: PrismaService,
    private interactionsService: InteractionsService,
  ) {}

  async findAll() {
    const devLogs = await this.prisma.devLog.findMany({
      where: { deleted_at: null },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });

    const interactionCounts =
      await this.interactionsService.get_interaction_counts_for_many(
        TargetType.DEV_LOG,
        devLogs.map((log) => log.id),
      );

    const viewCounts = await this.prisma.view.groupBy({
      by: ['target_id'],
      where: {
        target_type: TargetType.DEV_LOG,
        target_id: {
          in: devLogs.map((log) => log.id),
        },
      },
      _count: {
        _all: true,
      },
    });

    const viewCountMap = new Map(
      viewCounts.map((count) => [count.target_id, count._count._all]),
    );

    return devLogs.map((log) => ({
      ...log,
      interactions: interactionCounts.get(log.id) || {
        likes: 0,
        dislikes: 0,
        comments: 0,
      },
      views: viewCountMap.get(log.id) || 0,
    }));
  }

  async findOne(id: number) {
    const devLog = await this.prisma.devLog.findFirst({
      where: { id, deleted_at: null },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!devLog) {
      throw new NotFoundException(`Dev log with ID ${id} not found`);
    }

    const interactions = await this.interactionsService.get_interaction_counts(
      TargetType.DEV_LOG,
      id,
    );

    const viewCount = await this.prisma.view.count({
      where: {
        target_type: TargetType.DEV_LOG,
        target_id: id,
      },
    });

    return {
      ...devLog,
      interactions,
      views: viewCount,
    };
  }

  async create(data: any, authorId: string) {
    return this.prisma.devLog.create({
      data: {
        ...data,
        author_id: authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async update(id: number, data: any, userId: string) {
    const devLog = await this.findOne(id);

    if (devLog.author_id !== userId) {
      throw new ForbiddenException('You can only update your own dev logs');
    }

    return this.prisma.devLog.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async remove(id: number, userId: string) {
    const devLog = await this.findOne(id);

    if (devLog.author_id !== userId) {
      throw new ForbiddenException('You can only delete your own dev logs');
    }

    return this.prisma.devLog.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
