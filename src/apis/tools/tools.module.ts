import { Module } from '@nestjs/common';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [ToolsController],
  providers: [ToolsService, PrismaService],
})
export class ToolsModule {}
