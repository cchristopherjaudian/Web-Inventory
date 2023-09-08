/*
  Warnings:

  - You are about to drop the column `accountTypes` on the `Account` table. All the data in the column will be lost.
  - Added the required column `accountType` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accountTypes",
ADD COLUMN     "accountType" "AccountTypes" NOT NULL;
