/*
  Warnings:

  - You are about to drop the column `stockIndicator` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "stockIndicator" "StockIndicator" NOT NULL DEFAULT 'NORMAL';

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "stockIndicator";
