/*
  Warnings:

  - You are about to drop the column `so` on the `device` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `device` DROP COLUMN `so`,
    ADD COLUMN `os` VARCHAR(191) NULL;
