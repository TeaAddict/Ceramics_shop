-- DropForeignKey
ALTER TABLE `solditem` DROP FOREIGN KEY `SoldItem_itemId_fkey`;

-- AlterTable
ALTER TABLE `solditem` MODIFY `itemId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `SoldItem` ADD CONSTRAINT `SoldItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
