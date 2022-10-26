/*
  Warnings:

  - Added the required column `lab` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` ADD COLUMN `lab` VARCHAR(191) NOT NULL,
    ADD COLUMN `labId` VARCHAR(191) NOT NULL;
