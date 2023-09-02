/*
  Warnings:

  - You are about to drop the `ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingredientsOnRecipes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredients` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingredientsOnRecipes" DROP CONSTRAINT "ingredientsOnRecipes_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredientsOnRecipes" DROP CONSTRAINT "ingredientsOnRecipes_recipeId_fkey";

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "ingredients" TEXT NOT NULL;

-- DropTable
DROP TABLE "ingredients";

-- DropTable
DROP TABLE "ingredientsOnRecipes";
