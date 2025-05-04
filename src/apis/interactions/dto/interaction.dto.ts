import { TargetType } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateInteractionDto {
  @IsEnum(TargetType)
  target_type: TargetType;

  @IsNumber()
  target_id: number;
}

export class InteractionResponseDto {
  id: number;
  user_id: number;
  target_type: TargetType;
  target_id: number;
  created_at: Date;
}

export class InteractionCountsDto {
  likes: number;
  dislikes: number;
  comments: number;
}
