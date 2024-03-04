-- AlterTable
ALTER TABLE "equipment_ratio" ADD COLUMN     "temporaryEfficiencyId" UUID;

-- AlterTable
ALTER TABLE "fluid_ratio" ADD COLUMN     "temporaryEfficiencyId" UUID;

-- CreateTable
CREATE TABLE "temporary_efficiencies" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "well" TEXT NOT NULL,
    "available_hours" DOUBLE PRECISION NOT NULL,
    "dtm_hours" DOUBLE PRECISION NOT NULL,
    "has_demobilization" BOOLEAN NOT NULL,
    "has_mobilization" BOOLEAN,
    "has_extra_trailer" BOOLEAN NOT NULL,
    "has_power_swivel" BOOLEAN NOT NULL,
    "has_truck_cart_rent" BOOLEAN NOT NULL,
    "has_transportation" BOOLEAN NOT NULL,
    "truck_km_amount" DOUBLE PRECISION NOT NULL,
    "bot_rent_hours" DOUBLE PRECISION NOT NULL,
    "has_mix_tank_month_rent" BOOLEAN NOT NULL,
    "has_mix_tank_hour_rent" BOOLEAN NOT NULL,
    "has_generator_fuel" BOOLEAN NOT NULL,
    "has_mix_tank_operator" BOOLEAN NOT NULL,
    "has_mix_tank_dtm" BOOLEAN NOT NULL,
    "has_mix_tank_mobilization" BOOLEAN NOT NULL,
    "has_mix_tank_demobilization" BOOLEAN NOT NULL,
    "has_sucking_truck" BOOLEAN NOT NULL,
    "has_truck_tank" BOOLEAN NOT NULL,
    "christmas_tree_disassembly_hours" DOUBLE PRECISION NOT NULL,
    "has_munck" BOOLEAN NOT NULL,
    "rig_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "temporary_efficiencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "temporary_fluid_ratio" (
    "id" UUID NOT NULL,
    "ratio" "Interval" NOT NULL,
    "temporary_efficiency_id" UUID NOT NULL,

    CONSTRAINT "temporary_fluid_ratio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "temporary_equipment_ratio" (
    "id" UUID NOT NULL,
    "ratio" "Interval" NOT NULL,
    "temporary_efficiency_id" UUID NOT NULL,

    CONSTRAINT "temporary_equipment_ratio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "temporary_periods" (
    "id" UUID NOT NULL,
    "start_hour" TIMESTAMP(3) NOT NULL,
    "end_hour" TIMESTAMPTZ NOT NULL,
    "classification" "PeriodClassification" NOT NULL,
    "repairClassification" "RepairClassification",
    "description" TEXT,
    "type" "period_type" NOT NULL,
    "temporary_efficiency_id" UUID,
    "well_id" UUID,

    CONSTRAINT "temporary_periods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fluid_ratio" ADD CONSTRAINT "fluid_ratio_temporaryEfficiencyId_fkey" FOREIGN KEY ("temporaryEfficiencyId") REFERENCES "temporary_efficiencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_ratio" ADD CONSTRAINT "equipment_ratio_temporaryEfficiencyId_fkey" FOREIGN KEY ("temporaryEfficiencyId") REFERENCES "temporary_efficiencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temporary_efficiencies" ADD CONSTRAINT "temporary_efficiencies_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temporary_efficiencies" ADD CONSTRAINT "temporary_efficiencies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temporary_fluid_ratio" ADD CONSTRAINT "temporary_fluid_ratio_temporary_efficiency_id_fkey" FOREIGN KEY ("temporary_efficiency_id") REFERENCES "temporary_efficiencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temporary_equipment_ratio" ADD CONSTRAINT "temporary_equipment_ratio_temporary_efficiency_id_fkey" FOREIGN KEY ("temporary_efficiency_id") REFERENCES "temporary_efficiencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temporary_periods" ADD CONSTRAINT "temporary_periods_well_id_fkey" FOREIGN KEY ("well_id") REFERENCES "Well"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temporary_periods" ADD CONSTRAINT "temporary_periods_temporary_efficiency_id_fkey" FOREIGN KEY ("temporary_efficiency_id") REFERENCES "temporary_efficiencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
