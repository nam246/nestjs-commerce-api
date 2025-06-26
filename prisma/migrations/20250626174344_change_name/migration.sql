/*
  Warnings:

  - You are about to drop the `posts_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts_categories" DROP CONSTRAINT "posts_categories_post_category_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_category" DROP CONSTRAINT "posts_category_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_category" DROP CONSTRAINT "posts_category_user_created_fkey";

-- DropTable
DROP TABLE "posts_category";

-- CreateTable
CREATE TABLE "post_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "excerpt" TEXT,
    "content" TEXT,
    "image" JSONB,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "seo_keywords" TEXT,
    "order" INTEGER DEFAULT 0,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "user_created" INTEGER NOT NULL,
    "parent_id" INTEGER DEFAULT 0,
    "level" INTEGER,
    "cate_type" "CateType" NOT NULL DEFAULT 'post_category',
    "trash" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT,

    CONSTRAINT "post_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "post_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_categories" ADD CONSTRAINT "posts_categories_post_category_id_fkey" FOREIGN KEY ("post_category_id") REFERENCES "post_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
