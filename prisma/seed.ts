import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. 기본 사용자
  const user = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password_hash: 'hashed_password', // 실제에선 bcrypt로 암호화
    },
  });

  // 2. 포털 소스
  const source = await prisma.portalSource.create({
    data: {
      name: 'Naver',
      url: 'https://naver.com',
    },
  });

  // 3. 검색어 및 연결
  const searchTerm = await prisma.searchTerm.create({
    data: {
      keyword: 'AI',
      rank: 1,
      source_id: source.id,
    },
  });

  const prompt = await prisma.prompt.create({
    data: {
      type: 'BLOG',
      content: 'Write a blog post about {{keyword}}',
    },
  });

  const keyword = await prisma.keyword.create({
    data: {
      text: 'AI',
      status: 'PENDING',
      prompt_id: prompt.id,
      searchLinks: {
        create: [{ search_term_id: searchTerm.id }],
      },
    },
  });

  // 4. 블로그 채널
  const blogChannel = await prisma.blogChannel.create({
    data: {
      name: 'My Blogger',
      platform: 'BLOGGER',
      base_url: 'https://myblog.blogspot.com',
    },
  });

  // 5. 블로그 포스트
  const blogPost = await prisma.blogPost.create({
    data: {
      keyword_id: keyword.id,
      blog_channel_id: blogChannel.id,
      title: 'The Rise of AI',
      content:
        '<h2>나만의 제주 여행기</h2><p>지난주에 다녀온 제주도 여행은 정말 잊지 못할 경험이었어요. 에메랄드빛 바다와 푸른 초원이 너무 아름다웠죠.</p><img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" alt="제주 바다" style="max-width: 100%; border-radius: 8px; margin: 12px 0;" /><p>특히 성산일출봉에서 본 일출은 정말 장관이었어요. 아침 공기도 상쾌했고, 정상에 올랐을 때의 기분은 말로 표현할 수 없었죠.</p><img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" alt="제주 바다" style="max-width: 100%; border-radius: 8px; margin: 12px 0;" /><p>특히 성산일출봉에서 본 일출은 정말 장관이었어요. 아침 공기도 상쾌했고, 정상에 올랐을 때의 기분은 말로 표현할 수 없었죠.</p><img src="https://images.unsplash.com/photo-1600052293004-bff8ae7e6c0d" alt="성산일출봉" style="max-width: 100%; border-radius: 8px; margin: 12px 0;" /><ul>  <li>📍 협재 해수욕장</li>  <li>📍 우도 자전거 투어</li>  <li>📍 흑돼지 BBQ</li></ul><p>마지막으로 카페에서 여유롭게 커피 한 잔 하면서 마무리했어요. 다음에도 꼭 다시 가고 싶은 곳이에요.</p><img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" alt="제주 카페" style="max-width: 100%; border-radius: 8px; margin: 12px 0;" />',
    },
  });

  // 6. 태그
  await prisma.tag.create({
    data: {
      name: 'Technology',
      target_type: 'BLOG_POST',
      target_id: blogPost.id,
    },
  });

  // 7. 핫이슈
  const hotIssue = await prisma.hotIssue.create({
    data: {
      title: 'ChatGPT Launches GPT-5',
      content: 'OpenAI just announced GPT-5.',
      date: new Date(),
    },
  });

  // 8. 핫이슈 태그
  await prisma.tag.create({
    data: {
      name: 'OpenAI',
      target_type: 'HOT_ISSUE',
      target_id: hotIssue.id,
    },
  });

  console.log('✅ Seed complete');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
