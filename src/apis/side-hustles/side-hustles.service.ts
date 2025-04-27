import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class SideHustlesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.sideHustle.findMany({
      where: { deleted_at: null },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string) {
    const sideHustle = await this.prisma.sideHustle.findUnique({
      where: { id, deleted_at: null },
    });

    if (!sideHustle) {
      throw new NotFoundException(`Side hustle with ID ${id} not found`);
    }

    return sideHustle;
  }

  async create(data: any) {
    return this.prisma.sideHustle.create({
      data,
    });
  }

  async update(id: string, data: any) {
    // Check if side hustle exists
    await this.findOne(id);

    return this.prisma.sideHustle.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    // Check if side hustle exists
    await this.findOne(id);

    // Soft delete
    return this.prisma.sideHustle.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
