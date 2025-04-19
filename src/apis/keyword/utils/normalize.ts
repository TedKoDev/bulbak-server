// src/apis/keyword/utils/normalize.ts
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s\-_.]+/g, '') // 공백, 하이픈 등 제거
    .replace(/[^\w가-힣]/g, '') // 특수문자 제거
    .trim();
}
