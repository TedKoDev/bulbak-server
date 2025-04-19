/*
  Warnings:

  - You are about to drop the column `collectedAt` on the `Keyword` table. All the data in the column will be lost.
  - You are about to drop the column `keyword` on the `Keyword` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Keyword` table. All the data in the column will be lost.
  - Added the required column `text` to the `Keyword` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KeywordStatus" AS ENUM ('PENDING', 'SELECTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PromptType" AS ENUM ('BLOG', 'NEWS', 'JOB', 'COMMENTARY');

-- CreateEnum
CREATE TYPE "DataType" AS ENUM ('ARTICLE', 'JOB', 'RAW');

-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'RETRYING');

-- CreateEnum
CREATE TYPE "AiProvider" AS ENUM ('OPENAI', 'GEMINI', 'GROK', 'CUSTOM');

-- CreateEnum
CREATE TYPE "BlogPlatform" AS ENUM ('BLOGGER', 'TISTORY', 'WORDPRESS', 'NAVER', 'CUSTOM');

-- AlterTable
ALTER TABLE "Keyword" DROP COLUMN "collectedAt",
DROP COLUMN "keyword",
DROP COLUMN "source",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "priority" INTEGER,
ADD COLUMN     "prompt_id" INTEGER,
ADD COLUMN     "status" "KeywordStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "PortalSource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "PortalSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchTerm" (
    "id" SERIAL NOT NULL,
    "keyword" TEXT NOT NULL,
    "source_id" INTEGER NOT NULL,
    "collected_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "SearchTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" SERIAL NOT NULL,
    "type" "PromptType" NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrawledData" (
    "id" SERIAL NOT NULL,
    "site" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "DataType" NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "collected_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "CrawledData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogChannel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "platform" "BlogPlatform" NOT NULL,
    "base_url" TEXT,
    "client_id" TEXT,
    "client_secret" TEXT,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "BlogChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" SERIAL NOT NULL,
    "keyword_id" INTEGER NOT NULL,
    "blog_channel_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "publish_status" "PublishStatus" NOT NULL DEFAULT 'PENDING',
    "published_at" TIMESTAMP(3),
    "blog_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformLog" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT,
    "posted_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "PlatformLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiApiKey" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "provider" "AiProvider" NOT NULL,
    "base_url" TEXT,
    "client_key" TEXT NOT NULL,
    "secret_key" TEXT NOT NULL,
    "model_name" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "AiApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThumbnailTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "html_content" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ThumbnailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thumbnail" (
    "id" SERIAL NOT NULL,
    "blog_post_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,
    "title_text" TEXT,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Thumbnail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ButtonTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "html_content" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ButtonTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Button" (
    "id" SERIAL NOT NULL,
    "blog_post_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Button_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortalSource_name_key" ON "PortalSource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CrawledData_url_key" ON "CrawledData"("url");

-- CreateIndex
CREATE UNIQUE INDEX "BlogChannel_name_key" ON "BlogChannel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AiApiKey_name_key" ON "AiApiKey"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ThumbnailTemplate_name_key" ON "ThumbnailTemplate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ButtonTemplate_name_key" ON "ButtonTemplate"("name");

-- AddForeignKey
ALTER TABLE "SearchTerm" ADD CONSTRAINT "SearchTerm_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "PortalSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "Prompt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_blog_channel_id_fkey" FOREIGN KEY ("blog_channel_id") REFERENCES "BlogChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformLog" ADD CONSTRAINT "PlatformLog_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thumbnail" ADD CONSTRAINT "Thumbnail_blog_post_id_fkey" FOREIGN KEY ("blog_post_id") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thumbnail" ADD CONSTRAINT "Thumbnail_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "ThumbnailTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Button" ADD CONSTRAINT "Button_blog_post_id_fkey" FOREIGN KEY ("blog_post_id") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Button" ADD CONSTRAINT "Button_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "ButtonTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
