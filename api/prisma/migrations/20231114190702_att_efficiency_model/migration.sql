/*
  Warnings:

  - You are about to drop the column `has_bob_rent` on the `efficiencies` table. All the data in the column will be lost.
  - Added the required column `bot_rent_hours` to the `efficiencies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "efficiencies" DROP COLUMN "has_bob_rent",
ADD COLUMN     "bot_rent_hours" DOUBLE PRECISION NOT NULL;
