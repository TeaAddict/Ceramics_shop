/*
  Warnings:

  - You are about to drop the column `customerId` on the `address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_customerId_fkey`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `customerId`;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `addressId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_addressId_key` ON `Customer`(`addressId`);

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
