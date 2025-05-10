import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { TargetType } from '@prisma/client';
import { z } from 'zod';

export const CreateTagSchema = z.object({
  name: z.string(),
  target_type: z.nativeEnum(TargetType),
  target_id: z.number(),
});

export const UpdateTagSchema = z.object({
  name: z.string().optional(),
});

export type CreateTagDto = z.infer<typeof CreateTagSchema>;
export type UpdateTagDto = z.infer<typeof UpdateTagSchema>;

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const { name, target_type, target_id } = createTagDto;

    // Check if target exists
    let targetExists = false;
    switch (target_type) {
      case TargetType.BLOG_POST:
        targetExists = !!(await this.prisma.blogPost.findFirst({
          where: { id: target_id },
        }));
        break;
      case TargetType.HOT_ISSUE:
        targetExists = !!(await this.prisma.hotIssue.findFirst({
          where: { id: target_id },
        }));
        break;
      // Add other cases as needed
    }

    if (!targetExists) {
      throw new Error(`Target ${target_type} with id ${target_id} not found`);
    }

    const data: any = { name };
    if (target_type === TargetType.BLOG_POST) {
      data.blog_post = { connect: { id: target_id } };
    } else if (target_type === TargetType.HOT_ISSUE) {
      data.hot_issue = { connect: { id: target_id } };
    }

    return this.prisma.tag.create({ data });
  }

  async findAll() {
    return this.prisma.tag.findMany();
  }

  async findByTarget(target_type: TargetType, target_id: number) {
    const where: any = {};
    if (target_type === TargetType.BLOG_POST) {
      where.blog_post = { id: target_id };
    } else if (target_type === TargetType.HOT_ISSUE) {
      where.hot_issue = { id: target_id };
    }
    return this.prisma.tag.findMany({ where });
  }

  async findByName(name: string) {
    return this.prisma.tag.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    return this.prisma.tag.update({
      where: { id },
      data: updateTagDto,
    });
  }

  async remove(id: number) {
    return this.prisma.tag.delete({
      where: { id },
    });
  }

  async removeByTarget(target_type: TargetType, target_id: number) {
    const where: any = {};
    if (target_type === TargetType.BLOG_POST) {
      where.blog_post = { id: target_id };
    } else if (target_type === TargetType.HOT_ISSUE) {
      where.hot_issue = { id: target_id };
    }
    return this.prisma.tag.deleteMany({ where });
  }

  async addTagsToTarget(
    target_type: TargetType,
    target_id: number,
    tagNames: string[],
  ) {
    const tags = await Promise.all(
      tagNames.map(async (name) => {
        const data: any = { name };
        if (target_type === TargetType.BLOG_POST) {
          data.blog_post = { connect: { id: target_id } };
        } else if (target_type === TargetType.HOT_ISSUE) {
          data.hot_issue = { connect: { id: target_id } };
        }
        return this.prisma.tag.create({ data });
      }),
    );
    return tags;
  }

  async removeTagsFromTarget(
    target_type: TargetType,
    target_id: number,
    tagIds: number[],
  ) {
    const where: any = {
      id: { in: tagIds },
    };
    if (target_type === TargetType.BLOG_POST) {
      where.blog_post = { id: target_id };
    } else if (target_type === TargetType.HOT_ISSUE) {
      where.hot_issue = { id: target_id };
    }
    return this.prisma.tag.deleteMany({ where });
  }
}
