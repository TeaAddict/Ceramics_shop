-- DropForeignKey
ALTER TABLE `picture` DROP FOREIGN KEY `Picture_itemId_fkey`;

-- AlterTable
ALTER TABLE `picture` MODIFY `itemId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
