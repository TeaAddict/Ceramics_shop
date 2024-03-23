/*
  Warnings:

  - You are about to drop the `Favourites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favourites" DROP CONSTRAINT "Favourites_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Favourites" DROP CONSTRAINT "Favourites_userId_fkey";

-- DropTable
DROP TABLE "Favourites";
