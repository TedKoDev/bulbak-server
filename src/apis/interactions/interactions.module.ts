import { Module } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [InteractionsController],
  providers: [InteractionsService, PrismaService],
  exports: [InteractionsService],
})
export class InteractionsModule {}
