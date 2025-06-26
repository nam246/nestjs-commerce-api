/*
  Warnings:

  - The `cate_type` column on the `posts_category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `products_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CateType" AS ENUM ('post_category', 'product_category', 'other');

-- DropForeignKey
ALTER TABLE "products_categories" DROP CONSTRAINT "products_categories_product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "products_category" DROP CONSTRAINT "products_category_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "products_category" DROP CONSTRAINT "products_category_user_created_fkey";

-- AlterTable
ALTER TABLE "posts_category" DROP COLUMN "cate_type",
ADD COLUMN     "cate_type" "CateType" NOT NULL DEFAULT 'post_category';

-- DropTable
DROP TABLE "products_category";

-- CreateTable
CREATE TABLE "product_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT,
    "image" TEXT,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "seo_keywords" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "user_created" INTEGER NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "cate_type" "CateType" NOT NULL DEFAULT 'product_category',
    "trash" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
