/*
  Warnings:

  - You are about to drop the column `avalible` on the `device` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `device` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `device` DROP COLUMN `avalible`,
    DROP COLUMN `role`,
    ADD COLUMN `type` ENUM('PC', 'Impresora3D', 'Impresora', 'Proyector') NOT NULL DEFAULT 'PC';
