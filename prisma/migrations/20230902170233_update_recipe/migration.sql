/*
  Warnings:

  - You are about to drop the column `name` on the `recipes` table. All the data in the column will be lost.
  - Added the required column `image` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "name",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "recipe" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
