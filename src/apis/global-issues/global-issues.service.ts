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

  async findOne(id: number) {
    const globalIssue = await this.prisma.globalIssue.findFirst({
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

  async update(id: number, data: any) {
    const { stocks, ...globalIssueData } = data;

    await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      await tx.globalIssue.update({
        where: { id },
        data: globalIssueData,
      });

      if (stocks) {
        await tx.globalIssueStock.deleteMany({
          where: { global_issue_id: id },
        });

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

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.globalIssue.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
