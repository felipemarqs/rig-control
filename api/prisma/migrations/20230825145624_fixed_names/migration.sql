/*
  Warnings:

  - You are about to drop the `EquipmentRatio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FluidRatio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Period` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EquipmentRatio" DROP CONSTRAINT "EquipmentRatio_efficiency_id_fkey";

-- DropForeignKey
ALTER TABLE "FluidRatio" DROP CONSTRAINT "FluidRatio_efficiency_id_fkey";

-- DropForeignKey
ALTER TABLE "Period" DROP CONSTRAINT "Period_efficiency_id_fkey";

-- DropTable
DROP TABLE "EquipmentRatio";

-- DropTable
DROP TABLE "FluidRatio";

-- DropTable
DROP TABLE "Period";

-- CreateTable
CREATE TABLE "periods" (
    "id" UUID NOT NULL,
    "start_hour" TIMESTAMP(3) NOT NULL,
    "end_hour" TIMESTAMP(3) NOT NULL,
    "classification" "PeriodClassification" NOT NULL,
    "description" TEXT,
    "type" "period_type" NOT NULL,
    "efficiency_id" UUID NOT NULL,

    CONSTRAINT "periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fluid_ratio" (
    "id" UUID NOT NULL,
    "ratio" "Interval" NOT NULL,
    "efficiency_id" UUID NOT NULL,

    CONSTRAINT "fluid_ratio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment_ratio" (
    "id" UUID NOT NULL,
    "ratio" "Interval" NOT NULL,
    "efficiency_id" UUID NOT NULL,

    CONSTRAINT "equipment_ratio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "periods" ADD CONSTRAINT "periods_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fluid_ratio" ADD CONSTRAINT "fluid_ratio_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_ratio" ADD CONSTRAINT "equipment_ratio_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
