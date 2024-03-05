/*
  Warnings:

  - You are about to drop the column `city` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `line1` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `line2` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `amountDiscount` on the `solditem` table. All the data in the column will be lost.
  - You are about to drop the column `amountSubtotal` on the `solditem` table. All the data in the column will be lost.
  - You are about to drop the column `amountTax` on the `solditem` table. All the data in the column will be lost.
  - You are about to drop the column `amountTotal` on the `solditem` table. All the data in the column will be lost.
  - You are about to drop the column `unitAmount` on the `solditem` table. All the data in the column will be lost.
  - You are about to drop the column `amountSubtotal` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `amountTotal` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `amount_discount` to the `SoldItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_subtotal` to the `SoldItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_tax` to the `SoldItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_total` to the `SoldItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_amount` to the `SoldItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_subtotal` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_total` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `city`,
    DROP COLUMN `country`,
    DROP COLUMN `line1`,
    DROP COLUMN `line2`,
    DROP COLUMN `postal_code`,
    DROP COLUMN `state`,
    ADD COLUMN `tax_exempt` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `solditem` DROP COLUMN `amountDiscount`,
    DROP COLUMN `amountSubtotal`,
    DROP COLUMN `amountTax`,
    DROP COLUMN `amountTotal`,
    DROP COLUMN `unitAmount`,
    ADD COLUMN `amount_discount` DOUBLE NOT NULL,
    ADD COLUMN `amount_subtotal` DOUBLE NOT NULL,
    ADD COLUMN `amount_tax` DOUBLE NOT NULL,
    ADD COLUMN `amount_total` DOUBLE NOT NULL,
    ADD COLUMN `unit_amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `amountSubtotal`,
    DROP COLUMN `amountTotal`,
    DROP COLUMN `paymentStatus`,
    ADD COLUMN `amount_subtotal` DOUBLE NOT NULL,
    ADD COLUMN `amount_total` DOUBLE NOT NULL,
    ADD COLUMN `payment_status` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NULL,
    `country` VARCHAR(191) NOT NULL,
    `line1` VARCHAR(191) NULL,
    `line2` VARCHAR(191) NULL,
    `postal_code` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `customerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Address_customerId_key`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
