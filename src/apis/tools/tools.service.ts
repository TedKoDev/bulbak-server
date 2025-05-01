import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ToolsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tool.findMany({
      where: { deleted_at: null },
      orderBy: { rating: 'desc' },
    });
  }

  async findOne(id: number) {
    const tool = await this.prisma.tool.findUnique({
      where: { id, deleted_at: null },
    });

    if (!tool) {
      throw new NotFoundException(`Tool with ID ${id} not found`);
    }

    return tool;
  }

  async create(data: any) {
    return this.prisma.tool.create({
      data,
    });
  }

  async update(id: number, data: any) {
    // Check if tool exists
    await this.findOne(id);

    return this.prisma.tool.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    // Check if tool exists
    await this.findOne(id);

    // Soft delete
    return this.prisma.tool.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
