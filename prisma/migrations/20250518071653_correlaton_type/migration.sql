-- CreateEnum
CREATE TYPE "CorrelationType" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL');

-- AlterTable
ALTER TABLE "StockKRMapping" ADD COLUMN     "correlationType" "CorrelationType";
