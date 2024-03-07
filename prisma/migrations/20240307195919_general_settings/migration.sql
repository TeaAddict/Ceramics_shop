/*
  Warnings:

  - You are about to drop the `about` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `aboutcontent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `faq` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `aboutcontent` DROP FOREIGN KEY `AboutContent_aboutId_fkey`;

-- DropTable
DROP TABLE `about`;

-- DropTable
DROP TABLE `aboutcontent`;

-- DropTable
DROP TABLE `faq`;

-- CreateTable
CREATE TABLE `GeneralSettings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemsPerPage` INTEGER NOT NULL,
    `featuredSort` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
