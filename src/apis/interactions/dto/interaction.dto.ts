import { TargetType } from '@prisma/client';
import { IsEnum, IsNumber, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class CreateInteractionDto {
  @IsEnum(TargetType)
  target_type: TargetType;

  @IsNumber()
  target_id: number;
}

export class InteractionResponseDto {
  @IsNumber()
  id: number;

  @IsNumber()
  user_id: number;

  @IsEnum(TargetType)
  target_type: TargetType;

  @IsNumber()
  target_id: number;

  @IsDate()
  created_at: Date;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}

export class InteractionCountsDto {
  @IsNumber()
  likes: number;

  @IsNumber()
  dislikes: number;

  @IsNumber()
  comments: number;
}
