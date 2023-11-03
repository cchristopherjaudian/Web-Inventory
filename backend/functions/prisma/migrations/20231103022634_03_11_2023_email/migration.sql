/*
  Warnings:

  - Added the required column `emailAddress` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "groupNo" DROP NOT NULL,
ALTER COLUMN "groupNo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "emailAddress" VARCHAR(100) NOT NULL;
