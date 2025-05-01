import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class DevLogsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.devLog.findMany({
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

    return devLog;
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
