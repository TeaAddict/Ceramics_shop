-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_thumbnailId_fkey`;

-- AlterTable
ALTER TABLE `item` MODIFY `thumbnailId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_thumbnailId_fkey` FOREIGN KEY (`thumbnailId`) REFERENCES `Picture`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
