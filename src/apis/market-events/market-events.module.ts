import { Module } from '@nestjs/common';
import { MarketEventsController } from './market-events.controller';
import { MarketEventsService } from './market-events.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [MarketEventsController],
  providers: [MarketEventsService, PrismaService],
})
export class MarketEventsModule {}
