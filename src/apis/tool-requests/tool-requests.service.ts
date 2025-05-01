import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ToolRequestsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.toolRequest.findMany({
      orderBy: [{ status: 'asc' }, { votes: 'desc' }],
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const toolRequest = await this.prisma.toolRequest.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!toolRequest) {
      throw new NotFoundException(`Tool request with ID ${id} not found`);
    }

    return toolRequest;
  }

  async create(data: any, userId: string) {
    return this.prisma.toolRequest.create({
      data: {
        ...data,
        requested_by: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async update(id: number, data: any) {
    // Check if tool request exists
    await this.findOne(id);

    // If marking as completed, set completed_at date
    if (data.status === 'COMPLETED' && !data.completed_at) {
      data.completed_at = new Date();
    }

    return this.prisma.toolRequest.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async vote(id: number) {
    // Check if tool request exists
    await this.findOne(id);

    return this.prisma.toolRequest.update({
      where: { id },
      data: {
        votes: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
}
