import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.prompt.createMany({
    data: [
      {
        type: 'BLOG',
        content:
          'Write an engaging blog post about {keyword}. Include a title, introduction, bullet points, and conclusion.',
      },
      {
        type: 'NEWS',
        content:
          'Summarize the news article about {keyword}. Highlight key facts and context.',
      },
    ],
  });

  await prisma.thumbnailTemplate.create({
    data: {
      name: 'green-center',
      description: '중앙정렬 그린배경 썸네일',
      html_content: `<div class="thumbnail"><h1 class="title">{text}</h1></div>
<style>
.thumbnail {
  width: 768px;
  height: 768px;
  background-color: #27B4A4;
  color: black;
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  text-align: center;
  font-weight: bold;
  font-family: 'Nanum Gothic', sans-serif;
}
</style>`,
    },
  });

  await prisma.buttonTemplate.create({
    data: {
      name: 'orange-rounded',
      description: '주황색 둥근 버튼 스타일',
      html_content: `<a class="custom-button" href="{link}">{text}</a>
<style>
.custom-button {
  background-color: #ff5722;
  color: white;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  display: inline-block;
}
</style>`,
    },
  });
}

main()
  .then(() => {
    console.log('✅ Seeding completed');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
