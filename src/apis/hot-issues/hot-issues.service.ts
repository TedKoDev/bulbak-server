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

  async findOne(id: string) {
    const hotIssue = await this.prisma.hotIssue.findUnique({
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
          // Find or create tag
          let tag = await tx.tag.findUnique({
            where: { name: tagName },
          });

          if (!tag) {
            tag = await tx.tag.create({
              data: { name: tagName },
            });
          }

          // Create link between hotIssue and tag
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

  async update(id: string, data: any) {
    const { tags, ...hotIssueData } = data;

    // Check if hot issue exists
    await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      // Update hot issue
      await tx.hotIssue.update({
        where: { id },
        data: hotIssueData,
      });

      if (tags) {
        // Delete existing tags
        await tx.hotIssueTag.deleteMany({
          where: { hot_issue_id: id },
        });

        // Add new tags
        for (const tagName of tags) {
          // Find or create tag
          let tag = await tx.tag.findUnique({
            where: { name: tagName },
          });

          if (!tag) {
            tag = await tx.tag.create({
              data: { name: tagName },
            });
          }

          // Create link between hotIssue and tag
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

  async remove(id: string) {
    // Check if hot issue exists
    await this.findOne(id);

    // Soft delete
    return this.prisma.hotIssue.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
