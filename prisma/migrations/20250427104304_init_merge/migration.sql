/*
  Warnings:

  - The primary key for the `AiApiKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BlogChannel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BlogPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Button` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ButtonTemplate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CrawledData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CrawledDataKeywordLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Keyword` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PlatformLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PortalSource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Prompt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SearchTerm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SearchTermKeywordLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Thumbnail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ThumbnailTemplate` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "MarketType" AS ENUM ('STOCK_MARKET', 'STOCK', 'EXCHANGE_RATE', 'GOLD', 'OIL');

-- CreateEnum
CREATE TYPE "ToolRequestStatus" AS ENUM ('REQUESTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Impact" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL');

-- CreateEnum
CREATE TYPE "Importance" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "MarketEventCategory" AS ENUM ('ECONOMIC', 'EARNINGS', 'IPO', 'DIVIDEND', 'POLICY');

-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_blog_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_keyword_id_fkey";

-- DropForeignKey
ALTER TABLE "Button" DROP CONSTRAINT "Button_blog_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Button" DROP CONSTRAINT "Button_template_id_fkey";

-- DropForeignKey
ALTER TABLE "CrawledDataKeywordLink" DROP CONSTRAINT "CrawledDataKeywordLink_crawled_data_id_fkey";

-- DropForeignKey
ALTER TABLE "CrawledDataKeywordLink" DROP CONSTRAINT "CrawledDataKeywordLink_keyword_id_fkey";

-- DropForeignKey
ALTER TABLE "Keyword" DROP CONSTRAINT "Keyword_prompt_id_fkey";

-- DropForeignKey
ALTER TABLE "PlatformLog" DROP CONSTRAINT "PlatformLog_post_id_fkey";

-- DropForeignKey
ALTER TABLE "SearchTerm" DROP CONSTRAINT "SearchTerm_source_id_fkey";

-- DropForeignKey
ALTER TABLE "SearchTermKeywordLink" DROP CONSTRAINT "SearchTermKeywordLink_keyword_id_fkey";

-- DropForeignKey
ALTER TABLE "SearchTermKeywordLink" DROP CONSTRAINT "SearchTermKeywordLink_search_term_id_fkey";

-- DropForeignKey
ALTER TABLE "Thumbnail" DROP CONSTRAINT "Thumbnail_blog_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Thumbnail" DROP CONSTRAINT "Thumbnail_template_id_fkey";

-- AlterTable
ALTER TABLE "AiApiKey" DROP CONSTRAINT "AiApiKey_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "AiApiKey_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AiApiKey_id_seq";

-- AlterTable
ALTER TABLE "BlogChannel" DROP CONSTRAINT "BlogChannel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BlogChannel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BlogChannel_id_seq";

-- AlterTable
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "keyword_id" SET DATA TYPE TEXT,
ALTER COLUMN "blog_channel_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BlogPost_id_seq";

-- AlterTable
ALTER TABLE "Button" DROP CONSTRAINT "Button_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "blog_post_id" SET DATA TYPE TEXT,
ALTER COLUMN "template_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Button_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Button_id_seq";

-- AlterTable
ALTER TABLE "ButtonTemplate" DROP CONSTRAINT "ButtonTemplate_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ButtonTemplate_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ButtonTemplate_id_seq";

-- AlterTable
ALTER TABLE "CrawledData" DROP CONSTRAINT "CrawledData_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CrawledData_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CrawledData_id_seq";

-- AlterTable
ALTER TABLE "CrawledDataKeywordLink" DROP CONSTRAINT "CrawledDataKeywordLink_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "crawled_data_id" SET DATA TYPE TEXT,
ALTER COLUMN "keyword_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CrawledDataKeywordLink_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CrawledDataKeywordLink_id_seq";

-- AlterTable
ALTER TABLE "Keyword" DROP CONSTRAINT "Keyword_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "prompt_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Keyword_id_seq";

-- AlterTable
ALTER TABLE "PlatformLog" DROP CONSTRAINT "PlatformLog_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "post_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PlatformLog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PlatformLog_id_seq";

-- AlterTable
ALTER TABLE "PortalSource" DROP CONSTRAINT "PortalSource_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PortalSource_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PortalSource_id_seq";

-- AlterTable
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Prompt_id_seq";

-- AlterTable
ALTER TABLE "SearchTerm" DROP CONSTRAINT "SearchTerm_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "source_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SearchTerm_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SearchTerm_id_seq";

-- AlterTable
ALTER TABLE "SearchTermKeywordLink" DROP CONSTRAINT "SearchTermKeywordLink_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "search_term_id" SET DATA TYPE TEXT,
ALTER COLUMN "keyword_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SearchTermKeywordLink_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SearchTermKeywordLink_id_seq";

-- AlterTable
ALTER TABLE "Thumbnail" DROP CONSTRAINT "Thumbnail_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "blog_post_id" SET DATA TYPE TEXT,
ALTER COLUMN "template_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Thumbnail_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Thumbnail_id_seq";

-- AlterTable
ALTER TABLE "ThumbnailTemplate" DROP CONSTRAINT "ThumbnailTemplate_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ThumbnailTemplate_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ThumbnailTemplate_id_seq";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotIssue" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "thumbnail" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "HotIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotIssueTag" (
    "hot_issue_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "HotIssueTag_pkey" PRIMARY KEY ("hot_issue_id","tag_id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "rating" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "status" "ToolRequestStatus" NOT NULL DEFAULT 'REQUESTED',
    "requested_by" TEXT NOT NULL,
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "ToolRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SideHustle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "income_range" TEXT,
    "description" TEXT,
    "thumbnail" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "SideHustle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DevLog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "summary" TEXT,
    "content" TEXT,
    "author_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "DevLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketData" (
    "id" TEXT NOT NULL,
    "market_type" "MarketType" NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION,
    "change_percent" DOUBLE PRECISION,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalIssue" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "category" TEXT,
    "impact" "Impact" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "GlobalIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalIssueStock" (
    "global_issue_id" TEXT NOT NULL,
    "market_data_id" TEXT NOT NULL,

    CONSTRAINT "GlobalIssueStock_pkey" PRIMARY KEY ("global_issue_id","market_data_id")
);

-- CreateTable
CREATE TABLE "MarketEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3),
    "country" TEXT,
    "importance" "Importance" NOT NULL,
    "category" "MarketEventCategory" NOT NULL,
    "description" TEXT,
    "impact" "Impact" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "MarketEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "SearchTerm" ADD CONSTRAINT "SearchTerm_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "PortalSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "Prompt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchTermKeywordLink" ADD CONSTRAINT "SearchTermKeywordLink_search_term_id_fkey" FOREIGN KEY ("search_term_id") REFERENCES "SearchTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchTermKeywordLink" ADD CONSTRAINT "SearchTermKeywordLink_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrawledDataKeywordLink" ADD CONSTRAINT "CrawledDataKeywordLink_crawled_data_id_fkey" FOREIGN KEY ("crawled_data_id") REFERENCES "CrawledData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrawledDataKeywordLink" ADD CONSTRAINT "CrawledDataKeywordLink_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "HotIssueTag" ADD CONSTRAINT "HotIssueTag_hot_issue_id_fkey" FOREIGN KEY ("hot_issue_id") REFERENCES "HotIssue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotIssueTag" ADD CONSTRAINT "HotIssueTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolRequest" ADD CONSTRAINT "ToolRequest_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevLog" ADD CONSTRAINT "DevLog_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalIssueStock" ADD CONSTRAINT "GlobalIssueStock_global_issue_id_fkey" FOREIGN KEY ("global_issue_id") REFERENCES "GlobalIssue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalIssueStock" ADD CONSTRAINT "GlobalIssueStock_market_data_id_fkey" FOREIGN KEY ("market_data_id") REFERENCES "MarketData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
