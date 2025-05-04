import { IsString, IsEnum, IsNumber } from 'class-validator';
import { TargetType } from '@prisma/client';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsEnum(TargetType)
  target_type: TargetType;

  @IsNumber()
  target_id: number;
}

export class UpdateCommentDto {
  @IsString()
  content: string;
}

export class CommentResponseDto {
  id: number;
  content: string;
  target_type: TargetType;
  target_id: number;
  user_id: number;
  created_at: Date;
  deleted_at: Date | null;
  user: {
    id: number;
    username: string;
  };
}
