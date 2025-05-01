import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class HotIssuesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.hotIssue.findMany({
      where: { deleted_at: null },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: number) {
    const hotIssue = await this.prisma.hotIssue.findFirst({
      where: { id, deleted_at: null },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!hotIssue) {
      throw new NotFoundException(`Hot issue with ID ${id} not found`);
    }

    return hotIssue;
  }

  async create(data: any) {
    const { tags, ...hotIssueData } = data;

    return this.prisma.$transaction(async (tx) => {
      const hotIssue = await tx.hotIssue.create({
        data: hotIssueData,
      });

      if (tags && tags.length > 0) {
        for (const tagName of tags) {
          let tag = await tx.tag.findUnique({
            where: { name: tagName },
          });

          if (!tag) {
            tag = await tx.tag.create({
              data: { name: tagName },
            });
          }

          await tx.hotIssueTag.create({
            data: {
              hot_issue_id: hotIssue.id,
              tag_id: tag.id,
            },
          });
        }
      }

      return this.findOne(hotIssue.id);
    });
  }

  async update(id: number, data: any) {
    const { tags, ...hotIssueData } = data;

    await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      await tx.hotIssue.update({
        where: { id },
        data: hotIssueData,
      });

      if (tags) {
        await tx.hotIssueTag.deleteMany({
          where: { hot_issue_id: id },
        });

        for (const tagName of tags) {
          let tag = await tx.tag.findUnique({
            where: { name: tagName },
          });

          if (!tag) {
            tag = await tx.tag.create({
              data: { name: tagName },
            });
          }

          await tx.hotIssueTag.create({
            data: {
              hot_issue_id: id,
              tag_id: tag.id,
            },
          });
        }
      }

      return this.findOne(id);
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.hotIssue.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
