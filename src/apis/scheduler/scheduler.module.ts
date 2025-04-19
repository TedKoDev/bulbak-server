// src/apis/scheduler/scheduler.module.ts
import { Module } from '@nestjs/common';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { KeywordService } from '../keyword/keyword.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [SchedulerController],
  providers: [SchedulerService, KeywordService, PrismaService],
})
export class SchedulerModule {}
