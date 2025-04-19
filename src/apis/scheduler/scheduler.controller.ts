// src/apis/scheduler/scheduler.controller.ts
import { Controller, Post, Delete, HttpCode } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  // 크론 작업 시작 (등록)
  @Post('start')
  @HttpCode(200)
  start() {
    return this.schedulerService.start();
  }

  // 크론 작업 정지 (삭제)
  @Delete('stop')
  @HttpCode(200)
  stop() {
    return this.schedulerService.stop();
  }
}
