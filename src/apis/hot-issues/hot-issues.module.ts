import { Module } from '@nestjs/common';
import { HotIssuesController } from './hot-issues.controller';
import { HotIssuesService } from './hot-issues.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [HotIssuesController],
  providers: [HotIssuesService, PrismaService],
})
export class HotIssuesModule {}
