/*
  Warnings:

  - Added the required column `expiration` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "expiration" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;
