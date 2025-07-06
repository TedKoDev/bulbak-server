import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import {
  CreateStockUSDto,
  CreateStockKRMappingDto,
  CreateNasdaqCompanyDto,
  UpdateNasdaqCompanyDto,
} from './dto/stocks.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get('us')
  async getUSStocks(
    @Query('type') type?: 'GAINER' | 'LOSER',
    @Query('index') index?: 'SP500' | 'NASDAQ100',
  ) {
    return this.stocksService.getUSStocks(type, index);
  }

  @Get('us/:symbol')
  async getUSStockBySymbol(@Param('symbol') symbol: string) {
    return this.stocksService.getUSStockBySymbol(symbol);
  }

  @Post('us')
  async createUSStock(@Body() createStockUSDto: CreateStockUSDto) {
    return this.stocksService.createUSStock(createStockUSDto);
  }

  @Get('us/:symbol/kr-mappings')
  async getKRMappings(@Param('symbol') symbol: string) {
    return this.stocksService.getKRMappingsByUSSymbol(symbol);
  }

  @Get('nasdaq/:symbol/kr-mappings')
  async getKRMappingsByNasdaq(@Param('symbol') symbol: string) {
    return this.stocksService.getKRMappingsByNasdaqSymbol(symbol);
  }

  @Get('sp500/:symbol/kr-mappings')
  async getKRMappingsBySP500(@Param('symbol') symbol: string) {
    return this.stocksService.getKRMappingsBySP500Symbol(symbol);
  }

  @Post('kr-mappings')
  async createKRMapping(@Body() createKRMappingDto: CreateStockKRMappingDto) {
    console.log(createKRMappingDto);
    return this.stocksService.createKRMapping(createKRMappingDto);
  }

  // Nasdaq Company endpoints
  @Get('nasdaq')
  async getNasdaqCompanies() {
    return this.stocksService.getNasdaqCompanies();
  }

  @Get('nasdaq/:id')
  async getNasdaqCompanyById(@Param('id') id: string) {
    return this.stocksService.getNasdaqCompanyById(+id);
  }

  @Get('nasdaq/symbol/:symbol')
  async getNasdaqCompanyBySymbol(@Param('symbol') symbol: string) {
    return this.stocksService.getNasdaqCompanyBySymbol(symbol);
  }

  @Post('nasdaq')
  async createNasdaqCompany(
    @Body() createNasdaqCompanyDto: CreateNasdaqCompanyDto,
  ) {
    return this.stocksService.createNasdaqCompany(createNasdaqCompanyDto);
  }

  @Patch('nasdaq/:id')
  async updateNasdaqCompany(
    @Param('id') id: string,
    @Body() updateNasdaqCompanyDto: UpdateNasdaqCompanyDto,
  ) {
    return this.stocksService.updateNasdaqCompany(+id, updateNasdaqCompanyDto);
  }

  @Delete('nasdaq/:id')
  async deleteNasdaqCompany(@Param('id') id: string) {
    return this.stocksService.deleteNasdaqCompany(+id);
  }

  // SP500 Company endpoints
  @Get('sp500')
  async getSP500Companies() {
    return this.stocksService.getSP500Companies();
  }
}
