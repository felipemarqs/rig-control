/*
  Warnings:

  - Added the required column `rig_id` to the `billings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "billings" DROP CONSTRAINT "billings_efficiency_id_fkey";

-- AlterTable
ALTER TABLE "billings" ADD COLUMN     "rig_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "billings" ADD CONSTRAINT "billings_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billings" ADD CONSTRAINT "billings_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
