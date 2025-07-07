import { DataType } from '@prisma/client';

// model CrawledData {
//   id           Int       @id @default(autoincrement())
//   site         String
//   url          String    @unique
//   type         DataType
//   title        String?
//   content      String?
//   collected_at DateTime  @default(now())
//   created_at   DateTime  @default(now())
//   deleted_at   DateTime?
//   keywordLinks CrawledDataKeywordLink[]
// }

export class CreateCrawledDataDto {
  site: string;
  url: string;
  type: DataType;
  title?: string;
  content?: string;
}
