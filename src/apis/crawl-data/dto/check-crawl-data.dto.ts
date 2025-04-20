import { IsUrl, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CheckCrawledDataDto {
  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  selector?: string;

  @IsOptional()
  @IsBoolean()
  includeImages?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
