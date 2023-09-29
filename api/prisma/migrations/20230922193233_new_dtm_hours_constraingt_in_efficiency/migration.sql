/*
  Warnings:

  - Added the required column `dtm_hours` to the `efficiencies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "efficiencies" ADD COLUMN     "dtm_hours" DOUBLE PRECISION NOT NULL;
