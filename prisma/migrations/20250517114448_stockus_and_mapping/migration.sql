-- CreateEnum
CREATE TYPE "StockType" AS ENUM ('GAINER', 'LOSER');

-- CreateEnum
CREATE TYPE "StockIndex" AS ENUM ('SP500', 'NASDAQ100');

-- CreateTable
CREATE TABLE "StockUS" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "type" "StockType" NOT NULL,
    "index" "StockIndex" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockUS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockKRMapping" (
    "id" SERIAL NOT NULL,
    "stockUSId" INTEGER NOT NULL,
    "krName" TEXT NOT NULL,
    "krSymbol" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "StockKRMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StockUS_symbol_key" ON "StockUS"("symbol");

-- AddForeignKey
ALTER TABLE "StockKRMapping" ADD CONSTRAINT "StockKRMapping_stockUSId_fkey" FOREIGN KEY ("stockUSId") REFERENCES "StockUS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
