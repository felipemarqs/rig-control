/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `billing_configurations` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `billings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "billing_configurations" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "billings" DROP COLUMN "updatedAt";
