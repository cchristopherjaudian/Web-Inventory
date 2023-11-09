-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "dateRequested" TIMESTAMP(3),
ADD COLUMN     "dateRequired" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentUrl" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "photoUrl" TEXT;

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "photoUrl" TEXT;
