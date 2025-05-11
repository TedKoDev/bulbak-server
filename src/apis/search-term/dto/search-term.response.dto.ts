export class SourceResponseDto {
  id: number;
  name: string;
}

export class SearchTermResponseDto {
  id: number;
  keyword: string;
  rank: number;
  collected_at: Date;
  source: SourceResponseDto;
}
