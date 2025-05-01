import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SideHustlesService } from './side-hustles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/side-hustles')
export class SideHustlesController {
  constructor(private readonly sideHustlesService: SideHustlesService) {}

  @Get()
  findAll() {
    return this.sideHustlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sideHustlesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSideHustleDto: any) {
    return this.sideHustlesService.create(createSideHustleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSideHustleDto: any,
  ) {
    return this.sideHustlesService.update(id, updateSideHustleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sideHustlesService.remove(id);
  }
}
