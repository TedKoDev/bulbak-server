import { Module } from '@nestjs/common';
import { ToolRequestsController } from './tool-requests.controller';
import { ToolRequestsService } from './tool-requests.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [ToolRequestsController],
  providers: [ToolRequestsService, PrismaService],
})
export class ToolRequestsModule {}
