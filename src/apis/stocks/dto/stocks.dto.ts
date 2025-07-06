import {
  IsString,
  IsNumber,
  IsEnum,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum StockType {
  GAINER = 'GAINER',
  LOSER = 'LOSER',
}

export enum StockIndex {
  SP500 = 'SP500',
  NASDAQ100 = 'NASDAQ100',
}

export enum KRMarketType {
  KOSPI = 'KOSPI',
  KOSDAQ = 'KOSDAQ',
}

export class CreateStockUSDto {
  @IsString()
  symbol: string;

  @IsString()
  name: string;

  @IsNumber()
  change: number;

  @IsEnum(StockType)
  type: StockType;

  @IsEnum(StockIndex)
  index: StockIndex;

  @IsDate()
  @Type(() => Date)
  date: Date;
}

export class CreateStockKRMappingDto {
  @IsString()
  krName: string;

  @IsString()
  krSymbol: string;

  @IsString()
  reason: string;

  @IsOptional()
  @IsString()
  nasdaqSymbol?: string;

  @IsOptional()
  @IsString()
  sp500Symbol?: string;

  @IsString()
  marketType: string;

  @IsString()
  correlationType: string;
}

export class CreateNasdaqCompanyDto {
  @IsString()
  symbol: string;

  @IsString()
  name: string;

  @IsString()
  krname: string;

  @IsString()
  sector?: string;
}

export class UpdateNasdaqCompanyDto {
  @IsString()
  name?: string;

  @IsString()
  krname?: string;

  @IsString()
  sector?: string;
}
