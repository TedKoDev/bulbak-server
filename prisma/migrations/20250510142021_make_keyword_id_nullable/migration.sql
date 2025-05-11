-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_keyword_id_fkey";

-- AlterTable
ALTER TABLE "BlogPost" ALTER COLUMN "keyword_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE SET NULL ON UPDATE CASCADE;
