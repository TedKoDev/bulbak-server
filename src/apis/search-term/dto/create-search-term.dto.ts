// dto/create-search-term.dto.ts
export class CreateSearchTermDto {
  platform: string; // daum, zum, nate, googletrend 등
  keyword: string; // ex. "황희찬 출전 불투명"
  rank: number; // ex. 1~10
  collectedAt: Date; // 수집 시간
}
