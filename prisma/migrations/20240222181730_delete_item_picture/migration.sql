-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_thumbnailId_fkey`;

-- DropForeignKey
ALTER TABLE `picture` DROP FOREIGN KEY `Picture_itemId_fkey`;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_thumbnailId_fkey` FOREIGN KEY (`thumbnailId`) REFERENCES `Picture`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
