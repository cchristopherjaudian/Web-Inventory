-- CreateEnum
CREATE TYPE "AccountTypes" AS ENUM ('BUSINESS', 'CUSTOMER', 'ADMIN', 'SUB_1', 'SUB_2');

-- CreateEnum
CREATE TYPE "AccountStatuses" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "RouteStatuses" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "StockIndicator" AS ENUM ('LOW', 'NORMAL', 'HIGH');

-- CreateEnum
CREATE TYPE "OrderStatuses" AS ENUM ('PREPARING', 'DISPATCHED', 'DELIVERED');

-- CreateEnum
CREATE TYPE "PaymentStatuses" AS ENUM ('PROCESSING', 'PAID');

-- CreateEnum
CREATE TYPE "PaymentMethods" AS ENUM ('COD', 'GCASH', 'BANK_TRANSFER');

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "status" "AccountStatuses" NOT NULL DEFAULT 'INACTIVE',
    "accountType" "AccountTypes",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "middlename" VARCHAR(100),
    "businessName" VARCHAR(100),
    "address" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "size" VARCHAR(100),
    "price" DECIMAL(9,2) NOT NULL,
    "content" DECIMAL(9,2),
    "category" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "stockIndicator" "StockIndicator" NOT NULL DEFAULT 'NORMAL',
    "expiration" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "groupNo" INTEGER NOT NULL,
    "profileId" TEXT,
    "saved" BOOLEAN DEFAULT false,
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "profileId" TEXT,
    "paymentMethod" "PaymentMethods" NOT NULL DEFAULT 'COD',
    "status" "PaymentStatuses" NOT NULL DEFAULT 'PROCESSING',
    "refNo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_status" (
    "id" TEXT NOT NULL,
    "profileId" TEXT,
    "status" "OrderStatuses" DEFAULT 'PREPARING',
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "orderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "status" "RouteStatuses" NOT NULL DEFAULT 'ACTIVE',
    "adminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_accountId_key" ON "profile"("accountId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_status" ADD CONSTRAINT "order_status_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_status" ADD CONSTRAINT "order_status_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
