-- AlterTable
ALTER TABLE `address` MODIFY `country` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `solditem` MODIFY `quantity` INTEGER NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `status` VARCHAR(191) NULL,
    MODIFY `currency` VARCHAR(191) NULL,
    MODIFY `amountSubtotal` DOUBLE NULL,
    MODIFY `amountTotal` DOUBLE NULL;
