-- Step 1: Add new integer ID columns
ALTER TABLE "User" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "PortalSource" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "SearchTerm" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "Keyword" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "Prompt" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "BlogPost" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "ToolRequest" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "DevLog" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "PlatformLog" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "Thumbnail" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "Button" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "SearchTermKeywordLink" ADD COLUMN "new_id" SERIAL;
ALTER TABLE "CrawledDataKeywordLink" ADD COLUMN "new_id" SERIAL;

-- Step 2: Add new integer foreign key columns
ALTER TABLE "SearchTerm" ADD COLUMN "new_source_id" INTEGER;
ALTER TABLE "Keyword" ADD COLUMN "new_prompt_id" INTEGER;
ALTER TABLE "BlogPost" ADD COLUMN "new_keyword_id" INTEGER;
ALTER TABLE "ToolRequest" ADD COLUMN "new_requested_by" INTEGER;
ALTER TABLE "DevLog" ADD COLUMN "new_author_id" INTEGER;
ALTER TABLE "PlatformLog" ADD COLUMN "new_post_id" INTEGER;
ALTER TABLE "Thumbnail" ADD COLUMN "new_blog_post_id" INTEGER;
ALTER TABLE "Button" ADD COLUMN "new_blog_post_id" INTEGER;
ALTER TABLE "SearchTermKeywordLink" ADD COLUMN "new_search_term_id" INTEGER;
ALTER TABLE "SearchTermKeywordLink" ADD COLUMN "new_keyword_id" INTEGER;
ALTER TABLE "CrawledDataKeywordLink" ADD COLUMN "new_keyword_id" INTEGER;

-- Step 3: Create temporary tables for foreign key updates
CREATE TABLE "temp_PortalSource" AS SELECT * FROM "PortalSource";
CREATE TABLE "temp_SearchTerm" AS SELECT * FROM "SearchTerm";
CREATE TABLE "temp_Keyword" AS SELECT * FROM "Keyword";
CREATE TABLE "temp_Prompt" AS SELECT * FROM "Prompt";
CREATE TABLE "temp_BlogPost" AS SELECT * FROM "BlogPost";
CREATE TABLE "temp_User" AS SELECT * FROM "User";
CREATE TABLE "temp_ToolRequest" AS SELECT * FROM "ToolRequest";
CREATE TABLE "temp_DevLog" AS SELECT * FROM "DevLog";
CREATE TABLE "temp_PlatformLog" AS SELECT * FROM "PlatformLog";
CREATE TABLE "temp_Thumbnail" AS SELECT * FROM "Thumbnail";
CREATE TABLE "temp_Button" AS SELECT * FROM "Button";
CREATE TABLE "temp_SearchTermKeywordLink" AS SELECT * FROM "SearchTermKeywordLink";
CREATE TABLE "temp_CrawledDataKeywordLink" AS SELECT * FROM "CrawledDataKeywordLink";

-- Step 4: Drop foreign key constraints
ALTER TABLE "SearchTerm" DROP CONSTRAINT "SearchTerm_source_id_fkey";
ALTER TABLE "Keyword" DROP CONSTRAINT "Keyword_prompt_id_fkey";
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_keyword_id_fkey";
ALTER TABLE "ToolRequest" DROP CONSTRAINT "ToolRequest_requested_by_fkey";
ALTER TABLE "DevLog" DROP CONSTRAINT "DevLog_author_id_fkey";
ALTER TABLE "PlatformLog" DROP CONSTRAINT "PlatformLog_post_id_fkey";
ALTER TABLE "Thumbnail" DROP CONSTRAINT "Thumbnail_blog_post_id_fkey";
ALTER TABLE "Button" DROP CONSTRAINT "Button_blog_post_id_fkey";
ALTER TABLE "SearchTermKeywordLink" DROP CONSTRAINT "SearchTermKeywordLink_search_term_id_fkey";
ALTER TABLE "SearchTermKeywordLink" DROP CONSTRAINT "SearchTermKeywordLink_keyword_id_fkey";
ALTER TABLE "CrawledDataKeywordLink" DROP CONSTRAINT "CrawledDataKeywordLink_keyword_id_fkey";

-- Step 5: Drop primary key constraints
ALTER TABLE "User" DROP CONSTRAINT "User_pkey";
ALTER TABLE "PortalSource" DROP CONSTRAINT "PortalSource_pkey";
ALTER TABLE "SearchTerm" DROP CONSTRAINT "SearchTerm_pkey";
ALTER TABLE "Keyword" DROP CONSTRAINT "Keyword_pkey";
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_pkey";
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_pkey";
ALTER TABLE "ToolRequest" DROP CONSTRAINT "ToolRequest_pkey";
ALTER TABLE "DevLog" DROP CONSTRAINT "DevLog_pkey";
ALTER TABLE "PlatformLog" DROP CONSTRAINT "PlatformLog_pkey";
ALTER TABLE "Thumbnail" DROP CONSTRAINT "Thumbnail_pkey";
ALTER TABLE "Button" DROP CONSTRAINT "Button_pkey";
ALTER TABLE "SearchTermKeywordLink" DROP CONSTRAINT "SearchTermKeywordLink_pkey";
ALTER TABLE "CrawledDataKeywordLink" DROP CONSTRAINT "CrawledDataKeywordLink_pkey";

-- Step 6: Drop old ID columns
ALTER TABLE "User" DROP COLUMN "id";
ALTER TABLE "PortalSource" DROP COLUMN "id";
ALTER TABLE "SearchTerm" DROP COLUMN "id";
ALTER TABLE "Keyword" DROP COLUMN "id";
ALTER TABLE "Prompt" DROP COLUMN "id";
ALTER TABLE "BlogPost" DROP COLUMN "id";
ALTER TABLE "ToolRequest" DROP COLUMN "id";
ALTER TABLE "DevLog" DROP COLUMN "id";
ALTER TABLE "PlatformLog" DROP COLUMN "id";
ALTER TABLE "Thumbnail" DROP COLUMN "id";
ALTER TABLE "Button" DROP COLUMN "id";
ALTER TABLE "SearchTermKeywordLink" DROP COLUMN "id";
ALTER TABLE "CrawledDataKeywordLink" DROP COLUMN "id";

-- Step 7: Drop old foreign key columns
ALTER TABLE "SearchTerm" DROP COLUMN "source_id";
ALTER TABLE "Keyword" DROP COLUMN "prompt_id";
ALTER TABLE "BlogPost" DROP COLUMN "keyword_id";
ALTER TABLE "ToolRequest" DROP COLUMN "requested_by";
ALTER TABLE "DevLog" DROP COLUMN "author_id";
ALTER TABLE "PlatformLog" DROP COLUMN "post_id";
ALTER TABLE "Thumbnail" DROP COLUMN "blog_post_id";
ALTER TABLE "Button" DROP COLUMN "blog_post_id";
ALTER TABLE "SearchTermKeywordLink" DROP COLUMN "search_term_id";
ALTER TABLE "SearchTermKeywordLink" DROP COLUMN "keyword_id";
ALTER TABLE "CrawledDataKeywordLink" DROP COLUMN "keyword_id";

-- Step 8: Rename new_id columns to id
ALTER TABLE "User" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "PortalSource" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "SearchTerm" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "Keyword" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "Prompt" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "BlogPost" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "ToolRequest" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "DevLog" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "PlatformLog" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "Thumbnail" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "Button" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "SearchTermKeywordLink" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "CrawledDataKeywordLink" RENAME COLUMN "new_id" TO "id";

-- Step 9: Rename new foreign key columns
ALTER TABLE "SearchTerm" RENAME COLUMN "new_source_id" TO "source_id";
ALTER TABLE "Keyword" RENAME COLUMN "new_prompt_id" TO "prompt_id";
ALTER TABLE "BlogPost" RENAME COLUMN "new_keyword_id" TO "keyword_id";
ALTER TABLE "ToolRequest" RENAME COLUMN "new_requested_by" TO "requested_by";
ALTER TABLE "DevLog" RENAME COLUMN "new_author_id" TO "author_id";
ALTER TABLE "PlatformLog" RENAME COLUMN "new_post_id" TO "post_id";
ALTER TABLE "Thumbnail" RENAME COLUMN "new_blog_post_id" TO "blog_post_id";
ALTER TABLE "Button" RENAME COLUMN "new_blog_post_id" TO "blog_post_id";
ALTER TABLE "SearchTermKeywordLink" RENAME COLUMN "new_search_term_id" TO "search_term_id";
ALTER TABLE "SearchTermKeywordLink" RENAME COLUMN "new_keyword_id" TO "keyword_id";
ALTER TABLE "CrawledDataKeywordLink" RENAME COLUMN "new_keyword_id" TO "keyword_id";

-- Step 10: Add primary key constraints
ALTER TABLE "User" ADD PRIMARY KEY ("id");
ALTER TABLE "PortalSource" ADD PRIMARY KEY ("id");
ALTER TABLE "SearchTerm" ADD PRIMARY KEY ("id");
ALTER TABLE "Keyword" ADD PRIMARY KEY ("id");
ALTER TABLE "Prompt" ADD PRIMARY KEY ("id");
ALTER TABLE "BlogPost" ADD PRIMARY KEY ("id");
ALTER TABLE "ToolRequest" ADD PRIMARY KEY ("id");
ALTER TABLE "DevLog" ADD PRIMARY KEY ("id");
ALTER TABLE "PlatformLog" ADD PRIMARY KEY ("id");
ALTER TABLE "Thumbnail" ADD PRIMARY KEY ("id");
ALTER TABLE "Button" ADD PRIMARY KEY ("id");
ALTER TABLE "SearchTermKeywordLink" ADD PRIMARY KEY ("id");
ALTER TABLE "CrawledDataKeywordLink" ADD PRIMARY KEY ("id");

-- Step 11: Add foreign key constraints
ALTER TABLE "SearchTerm" ADD CONSTRAINT "SearchTerm_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "PortalSource"("id");
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "Prompt"("id");
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id");
ALTER TABLE "ToolRequest" ADD CONSTRAINT "ToolRequest_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "User"("id");
ALTER TABLE "DevLog" ADD CONSTRAINT "DevLog_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id");
ALTER TABLE "PlatformLog" ADD CONSTRAINT "PlatformLog_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "BlogPost"("id");
ALTER TABLE "Thumbnail" ADD CONSTRAINT "Thumbnail_blog_post_id_fkey" FOREIGN KEY ("blog_post_id") REFERENCES "BlogPost"("id");
ALTER TABLE "Button" ADD CONSTRAINT "Button_blog_post_id_fkey" FOREIGN KEY ("blog_post_id") REFERENCES "BlogPost"("id");
ALTER TABLE "SearchTermKeywordLink" ADD CONSTRAINT "SearchTermKeywordLink_search_term_id_fkey" FOREIGN KEY ("search_term_id") REFERENCES "SearchTerm"("id");
ALTER TABLE "SearchTermKeywordLink" ADD CONSTRAINT "SearchTermKeywordLink_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id");
ALTER TABLE "CrawledDataKeywordLink" ADD CONSTRAINT "CrawledDataKeywordLink_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id");

-- Step 12: Clean up temporary tables
DROP TABLE "temp_PortalSource";
DROP TABLE "temp_SearchTerm";
DROP TABLE "temp_Keyword";
DROP TABLE "temp_Prompt";
DROP TABLE "temp_BlogPost";
DROP TABLE "temp_User";
DROP TABLE "temp_ToolRequest";
DROP TABLE "temp_DevLog";
DROP TABLE "temp_PlatformLog";
DROP TABLE "temp_Thumbnail";
DROP TABLE "temp_Button";
DROP TABLE "temp_SearchTermKeywordLink";
DROP TABLE "temp_CrawledDataKeywordLink"; 