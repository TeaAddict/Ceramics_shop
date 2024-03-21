/*
  Warnings:

  - You are about to drop the column `onlineShop` on the `generalsettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `generalsettings` DROP COLUMN `onlineShop`,
    ADD COLUMN `paymentOnline` BOOLEAN NOT NULL DEFAULT false;
