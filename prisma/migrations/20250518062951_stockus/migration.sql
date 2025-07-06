/*
  Warnings:

  - You are about to drop the column `stockUSId` on the `StockKRMapping` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StockKRMapping" DROP CONSTRAINT "StockKRMapping_stockUSId_fkey";

-- AlterTable
ALTER TABLE "StockKRMapping" DROP COLUMN "stockUSId";
