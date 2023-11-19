/*
  Warnings:

  - Added the required column `well` to the `efficiencies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "efficiencies" ADD COLUMN     "well" TEXT NOT NULL;
