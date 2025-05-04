import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding full base data...');

  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@example.com',
      password_hash: 'hashed_pw',
    },
  });

  const portal = await prisma.portalSource.create({
    data: {
      name: 'Naver',
      url: 'https://naver.com',
    },
  });

  const searchTerm = await prisma.searchTerm.create({
    data: {
      keyword: 'ChatGPT',
      rank: 1,
      source_id: portal.id,
    },
  });

  const prompt = await prisma.prompt.create({
    data: {
      type: 'BLOG',
      content: 'Write a blog post about AI trends in Korea.',
    },
  });

  const keyword = await prisma.keyword.create({
    data: {
      text: 'AI in Korea',
      status: 'PENDING',
      prompt_id: prompt.id,
    },
  });

  await prisma.searchTermKeywordLink.create({
    data: {
      search_term_id: searchTerm.id,
      keyword_id: keyword.id,
    },
  });

  const crawledData = await prisma.crawledData.create({
    data: {
      site: 'example.com',
      url: 'https://example.com/article',
      type: 'ARTICLE',
      title: 'AI Policy News',
      content: 'AI policy updates for Korea...',
    },
  });

  await prisma.crawledDataKeywordLink.create({
    data: {
      crawled_data_id: crawledData.id,
      keyword_id: keyword.id,
    },
  });

  const blogChannel = await prisma.blogChannel.create({
    data: {
      name: 'Default Blogger',
      platform: 'BLOGGER',
      base_url: 'https://blogger.com',
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    },
  });

  const blogPost = await prisma.blogPost.create({
    data: {
      keyword_id: keyword.id,
      blog_channel_id: blogChannel.id,
      title: 'AI Trends in Korea',
      content: 'This is a seeded blog post.',
    },
  });

  await prisma.platformLog.create({
    data: {
      post_id: blogPost.id,
      platform: 'BLOGGER',
      posted_at: new Date(),
    },
  });

  const aiKey = await prisma.aiApiKey.create({
    data: {
      name: 'OpenAI Key',
      provider: 'OPENAI',
      client_key: 'demo-client-key',
      secret_key: 'demo-secret-key',
    },
  });

  const thumbnailTemplate = await prisma.thumbnailTemplate.create({
    data: {
      name: 'Default Thumbnail Template',
      html_content: '<div>Thumbnail Template</div>',
    },
  });

  await prisma.thumbnail.create({
    data: {
      blog_post_id: blogPost.id,
      template_id: thumbnailTemplate.id,
      title_text: 'Thumbnail Title',
      image_url: 'https://example.com/thumb.jpg',
    },
  });

  const buttonTemplate = await prisma.buttonTemplate.create({
    data: {
      name: 'Default Button Template',
      html_content: '<button>Click me</button>',
    },
  });

  await prisma.button.create({
    data: {
      blog_post_id: blogPost.id,
      template_id: buttonTemplate.id,
      text: 'Visit Blog',
      link_url: 'https://example.com',
      position: 'bottom',
    },
  });

  const tag = await prisma.tag.create({
    data: { name: 'AI' },
  });

  const hotIssue = await prisma.hotIssue.create({
    data: {
      title: 'AI and Policy',
      content: 'AI regulation policies being introduced.',
      date: new Date(),
      tags: {
        create: [{ tag: { connect: { id: tag.id } } }],
      },
    },
  });

  await prisma.tool.create({
    data: {
      name: 'HTML Generator',
      description: 'Generates embed HTML for blogs.',
    },
  });

  await prisma.toolRequest.create({
    data: {
      name: 'Post Scheduler',
      requested_by: user.id,
      description: 'Tool to schedule blog posts.',
    },
  });

  await prisma.sideHustle.create({
    data: {
      title: 'Newsletter Writer',
      category: 'Online Content',
      income_range: '$500~1000/month',
    },
  });

  await prisma.devLog.create({
    data: {
      title: 'Initial Setup Completed',
      date: new Date(),
      summary: 'Seeding script setup and tested.',
      content: 'All base models are seeded successfully.',
      author_id: user.id,
    },
  });

  const marketData = await prisma.marketData.create({
    data: {
      market_type: 'STOCK',
      name: 'Tesla Inc.',
      symbol: 'TSLA',
      price: 780,
    },
  });

  const globalIssue = await prisma.globalIssue.create({
    data: {
      title: 'Tech Layoffs Surge',
      date: new Date(),
      impact: 'NEGATIVE',
    },
  });

  await prisma.globalIssueStock.create({
    data: {
      global_issue_id: globalIssue.id,
      market_data_id: marketData.id,
    },
  });

  await prisma.marketEvent.create({
    data: {
      title: 'FOMC Decision',
      date: new Date(),
      importance: 'HIGH',
      category: 'ECONOMIC',
      impact: 'NEUTRAL',
      description: 'Federal Reserve interest rate announcement.',
    },
  });

  console.log('✅ All base data seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
