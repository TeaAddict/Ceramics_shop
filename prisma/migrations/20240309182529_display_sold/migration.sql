/*
  Warnings:

  - You are about to drop the column `isSoldFeatured` on the `generalsettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contacts` MODIFY `phone` VARCHAR(191) NOT NULL DEFAULT '866666666',
    MODIFY `email` VARCHAR(191) NOT NULL DEFAULT 'placeholder@email.com',
    MODIFY `physicalLocation` VARCHAR(191) NOT NULL DEFAULT 'placeholder st.';

-- AlterTable
ALTER TABLE `generalsettings` DROP COLUMN `isSoldFeatured`,
    ADD COLUMN `displaySold` ENUM('HIDE', 'DISPLAY') NOT NULL DEFAULT 'HIDE',
    MODIFY `itemsPerPage` INTEGER NOT NULL DEFAULT 8;
