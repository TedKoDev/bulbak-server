/*
  Warnings:

  - The primary key for the `AiApiKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `AiApiKey` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BlogChannel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BlogChannel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ButtonTemplate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ButtonTemplate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CrawledData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CrawledData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `GlobalIssue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GlobalIssue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `GlobalIssueStock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HotIssue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `HotIssue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `HotIssueTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MarketData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MarketData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `MarketEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MarketEvent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SideHustle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SideHustle` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Tag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ThumbnailTemplate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ThumbnailTemplate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Tool` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Tool` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `blog_channel_id` on the `BlogPost` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `template_id` on the `Button` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `crawled_data_id` on the `CrawledDataKeywordLink` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `global_issue_id` on the `GlobalIssueStock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `market_data_id` on the `GlobalIssueStock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hot_issue_id` on the `HotIssueTag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tag_id` on the `HotIssueTag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `template_id` on the `Thumbnail` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_blog_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "Button" DROP CONSTRAINT "Button_template_id_fkey";

-- DropForeignKey
ALTER TABLE "CrawledDataKeywordLink" DROP CONSTRAINT "CrawledDataKeywordLink_crawled_data_id_fkey";

-- DropForeignKey
ALTER TABLE "GlobalIssueStock" DROP CONSTRAINT "GlobalIssueStock_global_issue_id_fkey";

-- DropForeignKey
ALTER TABLE "GlobalIssueStock" DROP CONSTRAINT "GlobalIssueStock_market_data_id_fkey";

-- DropForeignKey
ALTER TABLE "HotIssueTag" DROP CONSTRAINT "HotIssueTag_hot_issue_id_fkey";

-- DropForeignKey
ALTER TABLE "HotIssueTag" DROP CONSTRAINT "HotIssueTag_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "Thumbnail" DROP CONSTRAINT "Thumbnail_template_id_fkey";

-- AlterTable
ALTER TABLE "AiApiKey" DROP CONSTRAINT "AiApiKey_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AiApiKey_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BlogChannel" DROP CONSTRAINT "BlogChannel_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BlogChannel_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "blog_channel_id",
ADD COLUMN     "blog_channel_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Button" DROP COLUMN "template_id",
ADD COLUMN     "template_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ButtonTemplate" DROP CONSTRAINT "ButtonTemplate_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ButtonTemplate_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CrawledData" DROP CONSTRAINT "CrawledData_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CrawledData_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CrawledDataKeywordLink" DROP COLUMN "crawled_data_id",
ADD COLUMN     "crawled_data_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GlobalIssue" DROP CONSTRAINT "GlobalIssue_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "GlobalIssue_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GlobalIssueStock" DROP CONSTRAINT "GlobalIssueStock_pkey",
DROP COLUMN "global_issue_id",
ADD COLUMN     "global_issue_id" INTEGER NOT NULL,
DROP COLUMN "market_data_id",
ADD COLUMN     "market_data_id" INTEGER NOT NULL,
ADD CONSTRAINT "GlobalIssueStock_pkey" PRIMARY KEY ("global_issue_id", "market_data_id");

-- AlterTable
ALTER TABLE "HotIssue" DROP CONSTRAINT "HotIssue_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "HotIssue_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "HotIssueTag" DROP CONSTRAINT "HotIssueTag_pkey",
DROP COLUMN "hot_issue_id",
ADD COLUMN     "hot_issue_id" INTEGER NOT NULL,
DROP COLUMN "tag_id",
ADD COLUMN     "tag_id" INTEGER NOT NULL,
ADD CONSTRAINT "HotIssueTag_pkey" PRIMARY KEY ("hot_issue_id", "tag_id");

-- AlterTable
ALTER TABLE "MarketData" DROP CONSTRAINT "MarketData_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MarketData_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MarketEvent" DROP CONSTRAINT "MarketEvent_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MarketEvent_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SideHustle" DROP CONSTRAINT "SideHustle_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SideHustle_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Thumbnail" DROP COLUMN "template_id",
ADD COLUMN     "template_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ThumbnailTemplate" DROP CONSTRAINT "ThumbnailTemplate_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ThumbnailTemplate_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tool" DROP CONSTRAINT "Tool_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tool_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "CrawledDataKeywordLink" ADD CONSTRAINT "CrawledDataKeywordLink_crawled_data_id_fkey" FOREIGN KEY ("crawled_data_id") REFERENCES "CrawledData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_blog_channel_id_fkey" FOREIGN KEY ("blog_channel_id") REFERENCES "BlogChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thumbnail" ADD CONSTRAINT "Thumbnail_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "ThumbnailTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Button" ADD CONSTRAINT "Button_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "ButtonTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotIssueTag" ADD CONSTRAINT "HotIssueTag_hot_issue_id_fkey" FOREIGN KEY ("hot_issue_id") REFERENCES "HotIssue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotIssueTag" ADD CONSTRAINT "HotIssueTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalIssueStock" ADD CONSTRAINT "GlobalIssueStock_global_issue_id_fkey" FOREIGN KEY ("global_issue_id") REFERENCES "GlobalIssue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalIssueStock" ADD CONSTRAINT "GlobalIssueStock_market_data_id_fkey" FOREIGN KEY ("market_data_id") REFERENCES "MarketData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
