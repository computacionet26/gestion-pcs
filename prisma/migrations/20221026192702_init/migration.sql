/*
  Warnings:

  - You are about to drop the column `pcId` on the `report` table. All the data in the column will be lost.
  - Added the required column `deviceId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceType` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` DROP COLUMN `pcId`,
    ADD COLUMN `deviceId` VARCHAR(191) NOT NULL,
    ADD COLUMN `deviceType` VARCHAR(191) NOT NULL,
    ADD COLUMN `user` VARCHAR(191) NOT NULL;
