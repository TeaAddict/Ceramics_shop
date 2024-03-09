/*
  Warnings:

  - Added the required column `featuredDisplaySold` to the `GeneralSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `generalsettings` ADD COLUMN `isSoldFeatured` BOOLEAN NOT NULL DEFAULT FALSE;

