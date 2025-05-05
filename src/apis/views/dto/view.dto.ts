import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { TargetType } from '@prisma/client';

export class CreateViewDto {
  @IsEnum(TargetType)
  target_type: TargetType;

  @IsNumber()
  target_id: number;

  @IsNumber()
  @IsOptional()
  user_id?: number;

  @IsString()
  @IsOptional()
  ip_address?: string;
}

export class ViewResponseDto {
  id: number;
  target_type: TargetType;
  target_id: number;
  user_id?: number;
  ip_address?: string;
  viewed_at: Date;
}
