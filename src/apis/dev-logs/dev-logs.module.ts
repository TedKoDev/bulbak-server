import { Module } from '@nestjs/common';
import { DevLogsController } from './dev-logs.controller';
import { DevLogsService } from './dev-logs.service';
import { PrismaService } from '../../common/prisma.service';
import { InteractionsModule } from '../interactions/interactions.module';

@Module({
  imports: [InteractionsModule],
  controllers: [DevLogsController],
  providers: [DevLogsService, PrismaService],
})
export class DevLogsModule {}
