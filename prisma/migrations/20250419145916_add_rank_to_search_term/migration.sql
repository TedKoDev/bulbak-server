/*
  Warnings:

  - Added the required column `rank` to the `SearchTerm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchTerm" ADD COLUMN     "rank" INTEGER NOT NULL;
