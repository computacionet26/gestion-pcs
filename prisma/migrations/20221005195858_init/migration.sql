/*
  Warnings:

  - You are about to drop the `pc` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `pc`;

-- CreateTable
CREATE TABLE `Device` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `avalible` BOOLEAN NOT NULL DEFAULT true,
    `role` ENUM('PC', 'Impresora3D', 'Impresora', 'Proyector') NOT NULL DEFAULT 'PC',
    `ram` VARCHAR(191) NULL,
    `cpu` VARCHAR(191) NULL,
    `gpu` VARCHAR(191) NULL,
    `disc` VARCHAR(191) NULL,
    `power` VARCHAR(191) NULL,
    `so` VARCHAR(191) NULL,
    `lab` VARCHAR(191) NOT NULL,
    `labId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
