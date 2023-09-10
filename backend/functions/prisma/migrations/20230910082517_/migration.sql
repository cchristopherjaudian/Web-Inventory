/*
  Warnings:

  - You are about to drop the column `stockType` on the `Products` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StockIndicator" AS ENUM ('LOW', 'NORMAL', 'HIGH');

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "stockType",
ADD COLUMN     "stockIndicator" "StockIndicator" NOT NULL DEFAULT 'NORMAL';

-- DropEnum
DROP TYPE "StockTypes";
