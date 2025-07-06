-- CreateEnum
CREATE TYPE "KRMarketType" AS ENUM ('KOSPI', 'KOSDAQ');

-- AlterTable
ALTER TABLE "StockKRMapping" ADD COLUMN     "marketType" "KRMarketType";
