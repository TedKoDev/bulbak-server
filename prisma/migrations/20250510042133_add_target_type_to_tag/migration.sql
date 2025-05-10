/*
  Warnings:

  - You are about to drop the `BlogPostTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HotIssueTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[target_type,target_id,name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `target_id` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_type` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BlogPostTag" DROP CONSTRAINT "BlogPostTag_blog_post_id_fkey";

-- DropForeignKey
ALTER TABLE "BlogPostTag" DROP CONSTRAINT "BlogPostTag_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "HotIssueTag" DROP CONSTRAINT "HotIssueTag_hot_issue_id_fkey";

-- DropForeignKey
ALTER TABLE "HotIssueTag" DROP CONSTRAINT "HotIssueTag_tag_id_fkey";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "target_id" INTEGER NOT NULL,
ADD COLUMN     "target_type" "TargetType" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "BlogPostTag";

-- DropTable
DROP TABLE "HotIssueTag";

-- CreateIndex
CREATE INDEX "Tag_target_type_target_id_idx" ON "Tag"("target_type", "target_id");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_target_type_target_id_name_key" ON "Tag"("target_type", "target_id", "name");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "tag_blog_post_fkey" FOREIGN KEY ("target_id") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "tag_hot_issue_fkey" FOREIGN KEY ("target_id") REFERENCES "HotIssue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
