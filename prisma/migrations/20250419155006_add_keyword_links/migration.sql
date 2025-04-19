-- CreateTable
CREATE TABLE "SearchTermKeywordLink" (
    "id" SERIAL NOT NULL,
    "search_term_id" INTEGER NOT NULL,
    "keyword_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchTermKeywordLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrawledDataKeywordLink" (
    "id" SERIAL NOT NULL,
    "crawled_data_id" INTEGER NOT NULL,
    "keyword_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CrawledDataKeywordLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SearchTermKeywordLink" ADD CONSTRAINT "SearchTermKeywordLink_search_term_id_fkey" FOREIGN KEY ("search_term_id") REFERENCES "SearchTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchTermKeywordLink" ADD CONSTRAINT "SearchTermKeywordLink_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrawledDataKeywordLink" ADD CONSTRAINT "CrawledDataKeywordLink_crawled_data_id_fkey" FOREIGN KEY ("crawled_data_id") REFERENCES "CrawledData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrawledDataKeywordLink" ADD CONSTRAINT "CrawledDataKeywordLink_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
