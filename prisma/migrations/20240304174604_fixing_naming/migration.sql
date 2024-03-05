/*
  Warnings:

  - You are about to drop the column `tax_exempt` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `amount_discount` on the `solditem` table. All the data in the column will be lost.
  - You are about to drop the column `amount_subtotal` on the `solditem` table. All the data in the column will be lost.
  - You are about to drop the column `amount_tax` on the `solditem` table. All the data in the column will be lost.
  - You are about to drop the column `amount_total` on the `solditem` table. All the data in the column will be lost.
  - You are about to drop the column `unit_amount` on the `solditem` table. All the data in the column will be lost.
  - You are about to drop the column `amount_subtotal` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `amount_total` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `payment_status` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `amountDiscount` to the `SoldItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountSubtotal` to the `SoldItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountTax` to the `SoldItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountTotal` to the `SoldItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitAmount` to the `SoldItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountSubtotal` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountTotal` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `tax_exempt`,
    ADD COLUMN `taxExempt` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `solditem` DROP COLUMN `amount_discount`,
    DROP COLUMN `amount_subtotal`,
    DROP COLUMN `amount_tax`,
    DROP COLUMN `amount_total`,
    DROP COLUMN `unit_amount`,
    ADD COLUMN `amountDiscount` DOUBLE NOT NULL,
    ADD COLUMN `amountSubtotal` DOUBLE NOT NULL,
    ADD COLUMN `amountTax` DOUBLE NOT NULL,
    ADD COLUMN `amountTotal` DOUBLE NOT NULL,
    ADD COLUMN `unitAmount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `amount_subtotal`,
    DROP COLUMN `amount_total`,
    DROP COLUMN `payment_status`,
    ADD COLUMN `amountSubtotal` DOUBLE NOT NULL,
    ADD COLUMN `amountTotal` DOUBLE NOT NULL,
    ADD COLUMN `paymentStatus` VARCHAR(191) NOT NULL;
