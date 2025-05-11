// dto/create-search-term.dto.ts
import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateSearchTermDto {
  @IsString()
  platform: string; // daum, zum, nate, googletrend 등

  @IsString()
  keyword: string; // ex. "황희찬 출전 불투명"

  @IsNumber()
  rank: number; // ex. 1~10

  @IsDateString()
  collectedAt: string; // 수집 시간
}
