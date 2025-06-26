/*
  Warnings:

  - The `image` column on the `post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `image` column on the `posts_category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `image` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ROOT';

-- AlterTable
ALTER TABLE "post" DROP COLUMN "image",
ADD COLUMN     "image" JSONB;

-- AlterTable
ALTER TABLE "posts_category" DROP COLUMN "image",
ADD COLUMN     "image" JSONB;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "image",
ADD COLUMN     "image" JSONB NOT NULL;
