import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateHotIssueDto, UpdateHotIssueDto } from './dto';

@Injectable()
export class HotIssuesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.hotIssue.findMany({
      include: {
        tags: true,
      },
    });
  }

  async findOne(id: number) {
    const hotIssue = await this.prisma.hotIssue.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });

    if (!hotIssue) {
      throw new NotFoundException(`Hot issue with ID ${id} not found`);
    }

    return hotIssue;
  }

  async create(createHotIssueDto: CreateHotIssueDto) {
    const { tags, ...hotIssueData } = createHotIssueDto;

    return this.prisma.$transaction(async (tx) => {
      const hotIssue = await tx.hotIssue.create({
        data: hotIssueData,
      });

      if (tags && tags.length > 0) {
        await Promise.all(
          tags.map(async (tagName) => {
            await tx.tag.create({
              data: {
                name: tagName,
                target_type: 'HOT_ISSUE',
                target_id: hotIssue.id,
              },
            });
          }),
        );
      }

      return this.findOne(hotIssue.id);
    });
  }

  async update(id: number, updateHotIssueDto: UpdateHotIssueDto) {
    const { tags, ...hotIssueData } = updateHotIssueDto;

    await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      await tx.hotIssue.update({
        where: { id },
        data: hotIssueData,
      });

      if (tags) {
        await tx.tag.deleteMany({
          where: {
            target_type: 'HOT_ISSUE',
            target_id: id,
          },
        });

        if (tags.length > 0) {
          await Promise.all(
            tags.map(async (tagName) => {
              await tx.tag.create({
                data: {
                  name: tagName,
                  target_type: 'HOT_ISSUE',
                  target_id: id,
                },
              });
            }),
          );
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
