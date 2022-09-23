/*
  Warnings:

  - Added the required column `cpu` to the `PC` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pc` ADD COLUMN `cpu` VARCHAR(191) NOT NULL,
    MODIFY `gpu` VARCHAR(191) NULL,
    MODIFY `power` VARCHAR(191) NULL,
    MODIFY `so` VARCHAR(191) NULL;
