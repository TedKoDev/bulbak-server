export enum KeywordStatus {
  PENDING = 'PENDING',
  SELECTED = 'SELECTED',
  REJECTED = 'REJECTED',
}

export class CreateKeywordDto {
  text: string;
  status?: KeywordStatus; // 기본값은 PENDING
  priority?: number;
  prompt_id?: number;
  sourceSearchTermIds?: number[];
  sourceCrawledDataIds?: number[];
}
