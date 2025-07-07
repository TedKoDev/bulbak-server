import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import {
  CreateStockUSDto,
  CreateStockKRMappingDto,
  CreateNasdaqCompanyDto,
  UpdateNasdaqCompanyDto,
} from './dto/stocks.dto';
import { StockType, StockIndex, KRMarketType } from '@prisma/client';
import { CorrelationType } from '@prisma/client';

@Injectable()
export class StocksService {
  constructor(private prisma: PrismaService) {}

  async getUSStocks(type?: StockType, index?: StockIndex) {
    return this.prisma.stockUS.findMany({
      where: {
        ...(type && { type }),
        ...(index && { index }),
      },
    });
  }

  async getUSStockBySymbol(symbol: string) {
    return this.prisma.stockUS.findUnique({
      where: { symbol },
    });
  }

  async createUSStock(data: CreateStockUSDto) {
    return this.prisma.stockUS.create({
      data,
    });
  }

  async getKRMappingsByUSSymbol(symbol: string) {
    return this.prisma.stockKRMapping.findMany({
      where: {
        OR: [
          { nasdaqSymbol: symbol },
          { sp500Symbol: symbol },
        ],
      },
    });
  }

  async getKRMappingsByNasdaqSymbol(symbol: string) {
    return this.prisma.stockKRMapping.findMany({
      where: { nasdaqSymbol: symbol },
    });
  }

  async getKRMappingsBySP500Symbol(symbol: string) {
    return this.prisma.stockKRMapping.findMany({
      where: { sp500Symbol: symbol },
    });
  }

  async createKRMapping(data: CreateStockKRMappingDto) {
    return this.prisma.stockKRMapping.create({
      data: {
        krName: data.krName,
        krSymbol: data.krSymbol,
        reason: data.reason,
        nasdaqSymbol: data.nasdaqSymbol,
        sp500Symbol: data.sp500Symbol,
        marketType: data.marketType as KRMarketType,
        correlationType: data.correlationType as CorrelationType,
      },
    });
  }

  // Nasdaq Company methods
  async getNasdaqCompanies() {
    return this.prisma.nasdaqCompany.findMany();
  }

  async getNasdaqCompanyById(id: number) {
    return this.prisma.nasdaqCompany.findUnique({
      where: { id },
    });
  }

  async getNasdaqCompanyBySymbol(symbol: string) {
    return this.prisma.nasdaqCompany.findUnique({
      where: { symbol },
    });
  }

  async createNasdaqCompany(createNasdaqCompanyDto: CreateNasdaqCompanyDto) {
    return this.prisma.nasdaqCompany.create({
      data: createNasdaqCompanyDto,
    });
  }

  async updateNasdaqCompany(
    id: number,
    updateNasdaqCompanyDto: UpdateNasdaqCompanyDto,
  ) {
    return this.prisma.nasdaqCompany.update({
      where: { id },
      data: updateNasdaqCompanyDto,
    });
  }

  async deleteNasdaqCompany(id: number) {
    return this.prisma.nasdaqCompany.delete({
      where: { id },
    });
  }

  // SP500 Company methods
  async getSP500Companies() {
    return this.prisma.sP500Company.findMany({
      orderBy: { symbol: 'asc' },
    });
  }
}
