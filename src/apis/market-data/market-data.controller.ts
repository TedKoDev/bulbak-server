import { Controller, Get } from '@nestjs/common';
import { MarketDataService } from './market-data.service';

@Controller('api/market-data')
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) {}

  @Get('stock-markets')
  findStockMarkets() {
    return this.marketDataService.findStockMarkets();
  }

  @Get('stocks')
  findStocks() {
    return this.marketDataService.findStocks();
  }

  @Get('exchange-rates')
  findExchangeRates() {
    return this.marketDataService.findExchangeRates();
  }

  @Get('gold')
  findGoldPrices() {
    return this.marketDataService.findGoldPrices();
  }

  @Get('oil')
  findOilPrices() {
    return this.marketDataService.findOilPrices();
  }
}
