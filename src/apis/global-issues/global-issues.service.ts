import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class GlobalIssuesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.globalIssue.findMany({
      where: { deleted_at: null },
      include: {
        stocks: {
          include: {
            market_data: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const globalIssue = await this.prisma.globalIssue.findUnique({
      where: { id, deleted_at: null },
      include: {
        stocks: {
          include: {
            market_data: true,
          },
        },
      },
    });

    if (!globalIssue) {
      throw new NotFoundException(`Global issue with ID ${id} not found`);
    }

    return globalIssue;
  }

  async create(data: any) {
    const { stocks, ...globalIssueData } = data;

    return this.prisma.$transaction(async (tx) => {
      const globalIssue = await tx.globalIssue.create({
        data: globalIssueData,
      });

      if (stocks && stocks.length > 0) {
        for (const stockId of stocks) {
          await tx.globalIssueStock.create({
            data: {
              global_issue_id: globalIssue.id,
              market_data_id: stockId,
            },
          });
        }
      }

      return this.findOne(globalIssue.id);
    });
  }

  async update(id: string, data: any) {
    const { stocks, ...globalIssueData } = data;

    // Check if global issue exists
    await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      // Update global issue
      await tx.globalIssue.update({
        where: { id },
        data: globalIssueData,
      });

      if (stocks) {
        // Delete existing stock links
        await tx.globalIssueStock.deleteMany({
          where: { global_issue_id: id },
        });

        // Add new stock links
        for (const stockId of stocks) {
          await tx.globalIssueStock.create({
            data: {
              global_issue_id: id,
              market_data_id: stockId,
            },
          });
        }
      }

      return this.findOne(id);
    });
  }

  async remove(id: string) {
    // Check if global issue exists
    await this.findOne(id);

    // Soft delete
    return this.prisma.globalIssue.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
