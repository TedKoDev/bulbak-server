/*
  Warnings:

  - The primary key for the `BlogPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BlogPost` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Button` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Button` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CrawledDataKeywordLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CrawledDataKeywordLink` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `DevLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `DevLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Keyword` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Keyword` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `prompt_id` column on the `Keyword` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PlatformLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PlatformLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PortalSource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PortalSource` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Prompt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Prompt` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SearchTerm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SearchTerm` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SearchTermKeywordLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SearchTermKeywordLink` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Thumbnail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Thumbnail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ToolRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ToolRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `keyword_id` on the `BlogPost` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `blog_post_id` on the `Button` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `keyword_id` on the `CrawledDataKeywordLink` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `author_id` on the `DevLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `post_id` on the `PlatformLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `source_id` on the `SearchTerm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `search_term_id` on the `SearchTermKeywordLink` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `keyword_id` on the `SearchTermKeywordLink` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `blog_post_id` on the `Thumbnail` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `requested_by` on the `ToolRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_keyword_id_fkey";

-- DropForeignKey
ALTER TABLE "Button" DROP CONSTRAINT "Button_blog_post_id_fkey";

-- DropForeignKey
ALTER TABLE "CrawledDataKeywordLink" DROP CONSTRAINT "CrawledDataKeywordLink_keyword_id_fkey";

-- DropForeignKey
ALTER TABLE "DevLog" DROP CONSTRAINT "DevLog_author_id_fkey";

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
ALTER TABLE "ToolRequest" DROP CONSTRAINT "ToolRequest_requested_by_fkey";

-- AlterTable
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "keyword_id",
ADD COLUMN     "keyword_id" INTEGER NOT NULL,
ADD CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Button" DROP CONSTRAINT "Button_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "blog_post_id",
ADD COLUMN     "blog_post_id" INTEGER NOT NULL,
ADD CONSTRAINT "Button_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CrawledDataKeywordLink" DROP CONSTRAINT "CrawledDataKeywordLink_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "keyword_id",
ADD COLUMN     "keyword_id" INTEGER NOT NULL,
ADD CONSTRAINT "CrawledDataKeywordLink_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DevLog" DROP CONSTRAINT "DevLog_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "author_id",
ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD CONSTRAINT "DevLog_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Keyword" DROP CONSTRAINT "Keyword_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "prompt_id",
ADD COLUMN     "prompt_id" INTEGER,
ADD CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PlatformLog" DROP CONSTRAINT "PlatformLog_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "post_id",
ADD COLUMN     "post_id" INTEGER NOT NULL,
ADD CONSTRAINT "PlatformLog_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PortalSource" DROP CONSTRAINT "PortalSource_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PortalSource_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SearchTerm" DROP CONSTRAINT "SearchTerm_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "source_id",
ADD COLUMN     "source_id" INTEGER NOT NULL,
ADD CONSTRAINT "SearchTerm_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SearchTermKeywordLink" DROP CONSTRAINT "SearchTermKeywordLink_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "search_term_id",
ADD COLUMN     "search_term_id" INTEGER NOT NULL,
DROP COLUMN "keyword_id",
ADD COLUMN     "keyword_id" INTEGER NOT NULL,
ADD CONSTRAINT "SearchTermKeywordLink_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Thumbnail" DROP CONSTRAINT "Thumbnail_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "blog_post_id",
ADD COLUMN     "blog_post_id" INTEGER NOT NULL,
ADD CONSTRAINT "Thumbnail_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ToolRequest" DROP CONSTRAINT "ToolRequest_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "requested_by",
ADD COLUMN     "requested_by" INTEGER NOT NULL,
ADD CONSTRAINT "ToolRequest_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "SearchTerm" ADD CONSTRAINT "SearchTerm_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "PortalSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "Prompt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchTermKeywordLink" ADD CONSTRAINT "SearchTermKeywordLink_search_term_id_fkey" FOREIGN KEY ("search_term_id") REFERENCES "SearchTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchTermKeywordLink" ADD CONSTRAINT "SearchTermKeywordLink_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrawledDataKeywordLink" ADD CONSTRAINT "CrawledDataKeywordLink_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformLog" ADD CONSTRAINT "PlatformLog_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thumbnail" ADD CONSTRAINT "Thumbnail_blog_post_id_fkey" FOREIGN KEY ("blog_post_id") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Button" ADD CONSTRAINT "Button_blog_post_id_fkey" FOREIGN KEY ("blog_post_id") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolRequest" ADD CONSTRAINT "ToolRequest_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevLog" ADD CONSTRAINT "DevLog_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
