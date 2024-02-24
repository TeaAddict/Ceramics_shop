-- DropForeignKey
ALTER TABLE `picture` DROP FOREIGN KEY `Picture_itemId_fkey`;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
