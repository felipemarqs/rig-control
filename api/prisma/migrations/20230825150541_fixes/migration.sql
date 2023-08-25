-- AlterEnum
ALTER TYPE "PeriodClassification" ADD VALUE 'WORKING';

-- DropForeignKey
ALTER TABLE "equipment_ratio" DROP CONSTRAINT "equipment_ratio_efficiency_id_fkey";

-- DropForeignKey
ALTER TABLE "fluid_ratio" DROP CONSTRAINT "fluid_ratio_efficiency_id_fkey";

-- DropForeignKey
ALTER TABLE "periods" DROP CONSTRAINT "periods_efficiency_id_fkey";

-- AddForeignKey
ALTER TABLE "periods" ADD CONSTRAINT "periods_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fluid_ratio" ADD CONSTRAINT "fluid_ratio_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_ratio" ADD CONSTRAINT "equipment_ratio_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
