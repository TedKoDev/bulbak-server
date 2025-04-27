import { Module } from '@nestjs/common';
import { MarketDataController } from './market-data.controller';
import { MarketDataService } from './market-data.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [MarketDataController],
  providers: [MarketDataService, PrismaService],
})
export class MarketDataModule {}
