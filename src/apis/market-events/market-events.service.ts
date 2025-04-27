import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class MarketEventsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.marketEvent.findMany({
      where: { deleted_at: null },
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    });
  }

  async findOne(id: string) {
    const marketEvent = await this.prisma.marketEvent.findUnique({
      where: { id, deleted_at: null },
    });

    if (!marketEvent) {
      throw new NotFoundException(`Market event with ID ${id} not found`);
    }

    return marketEvent;
  }

  async create(data: any) {
    return this.prisma.marketEvent.create({
      data,
    });
  }

  async update(id: string, data: any) {
    // Check if market event exists
    await this.findOne(id);

    return this.prisma.marketEvent.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    // Check if market event exists
    await this.findOne(id);

    // Soft delete
    return this.prisma.marketEvent.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
