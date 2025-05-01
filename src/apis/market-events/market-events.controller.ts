import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { MarketEventsService } from './market-events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/market-events')
export class MarketEventsController {
  constructor(private readonly marketEventsService: MarketEventsService) {}

  @Get()
  findAll() {
    return this.marketEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.marketEventsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMarketEventDto: any) {
    return this.marketEventsService.create(createMarketEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMarketEventDto: any,
  ) {
    return this.marketEventsService.update(id, updateMarketEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.marketEventsService.remove(id);
  }
}
