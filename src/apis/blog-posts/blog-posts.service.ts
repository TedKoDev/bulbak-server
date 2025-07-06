import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import {
  CreateBlogPostDto,
  UpdateBlogPostDto,
  BlogPostResponseDto,
} from './dto/blog-post.dto';
import { PublishStatus, TargetType } from '@prisma/client';
import { ViewsService } from '../views/views.service';
import { InteractionsService } from '../interactions/interactions.service';

type BlogPostWithStats = BlogPostResponseDto & {
  view_count: number;
  interactions: {
    likes: number;
    dislikes: number;
    comments: number;
  };
};

@Injectable()
export class BlogPostsService {
  constructor(
    private prisma: PrismaService,
    private views_service: ViewsService,
    private interactions_service: InteractionsService,
  ) {}

  async create(
    create_blog_post_dto: CreateBlogPostDto,
    author_id: number,
  ): Promise<BlogPostResponseDto> {
    const { tag_names, ...blogPostData } = create_blog_post_dto as any;

    console.log('blogPostData', blogPostData);
    console.log('tag_names', tag_names);

    // blog_channel_id 유효성 검사
    const blogChannel = await this.prisma.blogChannel.findUnique({
      where: { id: blogPostData.blog_channel_id },
    });

    if (!blogChannel) {
      throw new Error(
        `Blog channel with id ${blogPostData.blog_channel_id} does not exist`,
      );
    }

    // 먼저 BlogPost 생성
    const post = await this.prisma.blogPost.create({
      data: {
        ...blogPostData,
        author_id,
        publish_status: blogPostData.publish_status || PublishStatus.PENDING,
      },
      include: {
        keyword: true,
        blog_channel: true,
        platform_logs: true,
        thumbnails: true,
        buttons: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    // 그 다음 태그들 생성 (BlogPost ID가 생성된 후)
    let tags = [];
    if (tag_names && tag_names.length > 0) {
      await this.prisma.tag.createMany({
        data: tag_names.map((tagName) => ({
          name: tagName,
          target_type: 'BLOG_POST' as const,
          target_id: post.id,
        })),
        skipDuplicates: true, // 중복된 태그는 건너뛰기
      });

      // 태그 조회
      tags = await this.prisma.tag.findMany({
        where: {
          target_type: 'BLOG_POST',
          target_id: post.id,
        },
      });
    }

    return {
      ...post,
      tags: tags.map((t) => ({
        id: t.id,
        name: t.name,
      })),
      author: post.author
        ? {
            id: post.author.id,
            username: post.author.username,
          }
        : undefined,
    };
  }

  async findAll(): Promise<BlogPostWithStats[]> {
    const posts = await this.prisma.blogPost.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        keyword: true,
        blog_channel: true,
        platform_logs: true,
        thumbnails: true,
        buttons: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const [view_counts, interactions, allTags] = await Promise.all([
      this.views_service.getViewCountsForMany(
        TargetType.BLOG_POST,
        posts.map((post) => post.id),
      ),
      Promise.all(
        posts.map((post) =>
          this.interactions_service.get_interaction_counts(
            TargetType.BLOG_POST,
            post.id,
          ),
        ),
      ),
      this.prisma.tag.findMany({
        where: {
          target_type: 'BLOG_POST',
          target_id: { in: posts.map((post) => post.id) },
        },
      }),
    ]);

    return posts.map((post, index) => {
      const postTags = allTags.filter((tag) => tag.target_id === post.id);
      return {
        ...post,
        tags: postTags.map((t) => ({
          id: t.id,
          name: t.name,
        })),
        author: post.author
          ? {
              id: post.author.id,
              username: post.author.username,
            }
          : undefined,
        view_count: view_counts.get(post.id) || 0,
        interactions: interactions[index],
      };
    });
  }

  async findOne(id: number): Promise<BlogPostWithStats> {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
      include: {
        keyword: true,
        blog_channel: true,
        platform_logs: true,
        thumbnails: true,
        buttons: true,
        author: true,
      },
    });

    if (!post) {
      return null;
    }

    const [view_count, interactions, tags] = await Promise.all([
      this.views_service.getViewCount(TargetType.BLOG_POST, id),
      this.interactions_service.get_interaction_counts(
        TargetType.BLOG_POST,
        id,
      ),
      this.prisma.tag.findMany({
        where: {
          target_type: 'BLOG_POST',
          target_id: id,
        },
      }),
    ]);

    return {
      ...post,
      tags: tags.map((t) => ({
        id: t.id,
        name: t.name,
      })),
      author: post.author
        ? {
            id: post.author.id,
            username: post.author.username,
          }
        : undefined,
      view_count,
      interactions,
    };
  }

  async update(
    id: number,
    update_blog_post_dto: UpdateBlogPostDto,
  ): Promise<BlogPostResponseDto> {
    // Destructure to remove tag_names and any unexpected tags field from update data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tag_names, tags, ...blogPostData } = update_blog_post_dto as any;

    // tag_names가 undefined가 아닌 경우에만 tags 업데이트
    if (tag_names !== undefined) {
      // 먼저 기존 태그들을 삭제
      await this.prisma.tag.deleteMany({
        where: {
          target_type: 'BLOG_POST',
          target_id: id,
        },
      });

      // 새로운 태그들을 생성
      if (tag_names.length > 0) {
        await this.prisma.tag.createMany({
          data: tag_names.map((tagName) => ({
            name: tagName,
            target_type: 'BLOG_POST',
            target_id: id,
          })),
        });
      }
    }

    const post = await this.prisma.blogPost.update({
      where: { id },
      data: {
        ...blogPostData,
        updated_at: new Date(),
      },
      include: {
        keyword: true,
        blog_channel: true,
        platform_logs: true,
        thumbnails: true,
        buttons: true,
        author: true,
      },
    });

    // 태그 조회
    const postTags = await this.prisma.tag.findMany({
      where: {
        target_type: 'BLOG_POST',
        target_id: id,
      },
    });

    return {
      ...post,
      tags: postTags.map((t) => ({
        id: t.id,
        name: t.name,
      })),
    };
  }

  async remove(id: number): Promise<BlogPostResponseDto> {
    const post = await this.prisma.blogPost.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });

    // 태그 조회
    const postTags = await this.prisma.tag.findMany({
      where: {
        target_type: 'BLOG_POST',
        target_id: id,
      },
    });

    return {
      ...post,
      tags: postTags.map((t) => ({
        id: t.id,
        name: t.name,
      })),
    };
  }

  async findByKeyword(keyword_id: number): Promise<BlogPostWithStats[]> {
    const posts = await this.prisma.blogPost.findMany({
      where: {
        keyword_id,
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const [view_counts, interactions, allTags] = await Promise.all([
      this.views_service.getViewCountsForMany(
        TargetType.BLOG_POST,
        posts.map((post) => post.id),
      ),
      Promise.all(
        posts.map((post) =>
          this.interactions_service.get_interaction_counts(
            TargetType.BLOG_POST,
            post.id,
          ),
        ),
      ),
      this.prisma.tag.findMany({
        where: {
          target_type: 'BLOG_POST',
          target_id: { in: posts.map((post) => post.id) },
        },
      }),
    ]);

    return posts.map((post, index) => {
      const postTags = allTags.filter((tag) => tag.target_id === post.id);
      return {
        ...post,
        tags: postTags.map((t) => ({
          id: t.id,
          name: t.name,
        })),
        view_count: view_counts.get(post.id) || 0,
        interactions: interactions[index],
      };
    });
  }

  async findByBlogChannel(
    blog_channel_id: number,
  ): Promise<BlogPostWithStats[]> {
    const posts = await this.prisma.blogPost.findMany({
      where: {
        blog_channel_id,
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const [view_counts, interactions, allTags] = await Promise.all([
      this.views_service.getViewCountsForMany(
        TargetType.BLOG_POST,
        posts.map((post) => post.id),
      ),
      Promise.all(
        posts.map((post) =>
          this.interactions_service.get_interaction_counts(
            TargetType.BLOG_POST,
            post.id,
          ),
        ),
      ),
      this.prisma.tag.findMany({
        where: {
          target_type: 'BLOG_POST',
          target_id: { in: posts.map((post) => post.id) },
        },
      }),
    ]);

    return posts.map((post, index) => {
      const postTags = allTags.filter((tag) => tag.target_id === post.id);
      return {
        ...post,
        tags: postTags.map((t) => ({
          id: t.id,
          name: t.name,
        })),
        view_count: view_counts.get(post.id) || 0,
        interactions: interactions[index],
      };
    });
  }
}
