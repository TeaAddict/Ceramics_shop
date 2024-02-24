-- DropForeignKey
ALTER TABLE `favourites` DROP FOREIGN KEY `Favourites_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `favourites` DROP FOREIGN KEY `Favourites_userId_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_thumbnailId_fkey`;

-- AlterTable
ALTER TABLE `favourites` MODIFY `itemId` VARCHAR(191) NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_thumbnailId_fkey` FOREIGN KEY (`thumbnailId`) REFERENCES `Picture`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favourites` ADD CONSTRAINT `Favourites_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favourites` ADD CONSTRAINT `Favourites_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
