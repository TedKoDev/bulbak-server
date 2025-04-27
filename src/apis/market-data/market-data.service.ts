import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class MarketDataService {
  constructor(private prisma: PrismaService) {}

  async findStockMarkets() {
    return this.prisma.marketData.findMany({
      where: { market_type: 'STOCK_MARKET' },
      orderBy: { name: 'asc' },
    });
  }

  async findStocks() {
    return this.prisma.marketData.findMany({
      where: { market_type: 'STOCK' },
      orderBy: [{ name: 'asc' }, { symbol: 'asc' }],
    });
  }

  async findExchangeRates() {
    return this.prisma.marketData.findMany({
      where: { market_type: 'EXCHANGE_RATE' },
      orderBy: { name: 'asc' },
    });
  }

  async findGoldPrices() {
    return this.prisma.marketData.findMany({
      where: { market_type: 'GOLD' },
      orderBy: { updated_at: 'desc' },
    });
  }

  async findOilPrices() {
    return this.prisma.marketData.findMany({
      where: { market_type: 'OIL' },
      orderBy: { updated_at: 'desc' },
    });
  }
}
