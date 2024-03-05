-- CreateTable
CREATE TABLE `SoldItem` (
    `id` VARCHAR(191) NOT NULL,
    `amountDiscount` DOUBLE NOT NULL,
    `amountTax` DOUBLE NOT NULL,
    `amountSubtotal` DOUBLE NOT NULL,
    `amountTotal` DOUBLE NOT NULL,
    `unitAmount` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `transactionId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `paymentStatus` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `customerDetails` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `amountSubtotal` DOUBLE NOT NULL,
    `amountTotal` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SoldItem` ADD CONSTRAINT `SoldItem_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SoldItem` ADD CONSTRAINT `SoldItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
