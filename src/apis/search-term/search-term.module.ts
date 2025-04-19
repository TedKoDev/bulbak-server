import { Module } from '@nestjs/common';
import { SearchTermService } from './search-term.service';
import { SearchTermController } from './search-term.controller';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [SearchTermController],
  providers: [SearchTermService, PrismaService],
})
export class SearchTermModule {}
