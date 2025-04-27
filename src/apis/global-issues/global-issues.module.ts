import { Module } from '@nestjs/common';
import { GlobalIssuesController } from './global-issues.controller';
import { GlobalIssuesService } from './global-issues.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [GlobalIssuesController],
  providers: [GlobalIssuesService, PrismaService],
})
export class GlobalIssuesModule {}
