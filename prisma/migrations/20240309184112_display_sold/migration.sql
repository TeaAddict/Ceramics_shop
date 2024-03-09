/*
  Warnings:

  - You are about to alter the column `displaySold` on the `generalsettings` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `generalsettings` MODIFY `displaySold` BOOLEAN NOT NULL DEFAULT false;
