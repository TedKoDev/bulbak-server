import { Controller, Post, Body, Get, Query, Request } from '@nestjs/common';
import { ViewsService } from './views.service';
import { CreateViewDto, ViewResponseDto } from './dto/view.dto';
import { TargetType } from '@prisma/client';

@Controller('views')
export class ViewsController {
  constructor(private readonly views_service: ViewsService) {}

  @Post()
  async create(
    @Body() create_view_dto: CreateViewDto,
    @Request() req,
  ): Promise<ViewResponseDto> {
    // 로그인한 사용자의 경우 user_id 추가
    if (req.user?.id) {
      create_view_dto.user_id = req.user.id;
    }
    return this.views_service.create(create_view_dto);
  }

  @Get('count')
  async getViewCount(
    @Query('target_type') target_type: TargetType,
    @Query('target_id') target_id: number,
  ): Promise<{ count: number }> {
    const count = await this.views_service.getViewCount(target_type, target_id);
    return { count };
  }
}
