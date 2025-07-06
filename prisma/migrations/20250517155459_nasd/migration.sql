-- AlterTable
ALTER TABLE "StockKRMapping" ADD COLUMN     "nasdaqSymbol" TEXT,
ADD COLUMN     "sp500Symbol" TEXT;

-- CreateTable
CREATE TABLE "SP500Company" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "krname" TEXT NOT NULL,
    "sector" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SP500Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SP500Company_symbol_key" ON "SP500Company"("symbol");

-- CreateIndex
CREATE INDEX "StockKRMapping_nasdaqSymbol_idx" ON "StockKRMapping"("nasdaqSymbol");

-- CreateIndex
CREATE INDEX "StockKRMapping_sp500Symbol_idx" ON "StockKRMapping"("sp500Symbol");

-- AddForeignKey
ALTER TABLE "StockKRMapping" ADD CONSTRAINT "StockKRMapping_nasdaqSymbol_fkey" FOREIGN KEY ("nasdaqSymbol") REFERENCES "NasdaqCompany"("symbol") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockKRMapping" ADD CONSTRAINT "StockKRMapping_sp500Symbol_fkey" FOREIGN KEY ("sp500Symbol") REFERENCES "SP500Company"("symbol") ON DELETE SET NULL ON UPDATE CASCADE;
