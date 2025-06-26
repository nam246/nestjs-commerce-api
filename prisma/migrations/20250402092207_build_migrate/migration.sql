/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMINISTRATOR', 'CUSTOMER');

-- DropTable
DROP TABLE "Article";

-- DropTable
DROP TABLE "Customers";

-- DropTable
DROP TABLE "Products";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT,
    "image" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "seo_keywords" TEXT,
    "user_created" INTEGER NOT NULL,
    "post_type" TEXT NOT NULL DEFAULT 'post',
    "trash" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "excerpt" TEXT,
    "content" TEXT,
    "image" TEXT,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "seo_keywords" TEXT,
    "order" INTEGER DEFAULT 0,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "user_created" INTEGER NOT NULL,
    "parent_id" INTEGER DEFAULT 0,
    "level" INTEGER,
    "cate_type" TEXT NOT NULL DEFAULT 'post_category',
    "trash" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT,

    CONSTRAINT "posts_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_categories" (
    "post_id" INTEGER NOT NULL,
    "post_category_id" INTEGER NOT NULL,

    CONSTRAINT "posts_categories_pkey" PRIMARY KEY ("post_id","post_category_id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "code" INTEGER,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT,
    "image" TEXT,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "seo_keywords" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "price" DOUBLE PRECISION NOT NULL,
    "price_sale" DOUBLE PRECISION NOT NULL,
    "supplier_id" INTEGER,
    "brand_id" INTEGER,
    "order" INTEGER,
    "user_created" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'product',
    "trash" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_category" (
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
    "cate_type" TEXT NOT NULL DEFAULT 'post_category',
    "trash" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT,

    CONSTRAINT "products_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_categories" (
    "product_id" INTEGER NOT NULL,
    "product_category_id" INTEGER NOT NULL,

    CONSTRAINT "products_categories_pkey" PRIMARY KEY ("product_id","product_category_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_category" ADD CONSTRAINT "posts_category_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_category" ADD CONSTRAINT "posts_category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "posts_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_categories" ADD CONSTRAINT "posts_categories_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_categories" ADD CONSTRAINT "posts_categories_post_category_id_fkey" FOREIGN KEY ("post_category_id") REFERENCES "posts_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_category" ADD CONSTRAINT "products_category_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_category" ADD CONSTRAINT "products_category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "products_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "products_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
