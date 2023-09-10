-- CreateEnum
CREATE TYPE "StockTypes" AS ENUM ('LOW', 'NORMAL', 'HIGH');

-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "expiration" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "stockType" "StockTypes" NOT NULL DEFAULT 'NORMAL';
