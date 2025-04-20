import { IsString, IsUrl, IsOptional } from 'class-validator';

export class UpdateCrawledDataDto {
  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
