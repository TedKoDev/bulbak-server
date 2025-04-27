import { Module } from '@nestjs/common';
import { SideHustlesController } from './side-hustles.controller';
import { SideHustlesService } from './side-hustles.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [SideHustlesController],
  providers: [SideHustlesService, PrismaService],
})
export class SideHustlesModule {}
