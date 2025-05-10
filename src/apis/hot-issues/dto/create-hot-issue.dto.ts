import { IsString, IsOptional, IsArray, IsDate } from 'class-validator';

export class CreateHotIssueDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsDate()
  date: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
