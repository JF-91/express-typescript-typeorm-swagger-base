/*
  Warnings:

  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CategoryToPost` DROP FOREIGN KEY `_CategoryToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToPost` DROP FOREIGN KEY `_CategoryToPost_B_fkey`;

-- AlterTable
ALTER TABLE `Permission` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `_CategoryToPost`;

-- CreateTable
CREATE TABLE `post_categories` (
    `postId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `post_categories_categoryId_idx`(`categoryId`),
    INDEX `post_categories_postId_idx`(`postId`),
    PRIMARY KEY (`postId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PostCategories` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PostCategories_AB_unique`(`A`, `B`),
    INDEX `_PostCategories_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PostCategories` ADD CONSTRAINT `_PostCategories_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostCategories` ADD CONSTRAINT `_PostCategories_B_fkey` FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
