-- CreateEnum
CREATE TYPE "period_type" AS ENUM ('GLOSS', 'REPAIR', 'DTM', 'WORKING');

-- CreateEnum
CREATE TYPE "PeriodClassification" AS ENUM ('LABOR', 'PROCESS', 'LOGISTICS', 'SECURITY', 'RIG_CAR', 'MAST', 'RIG_WINCH', 'RIG_TRANSMISSION', 'UCI', 'MUD_TANK', 'TRAILER', 'MUD_BOMB', 'PIPE_RACK', 'BOP', 'CHOKE_MANIFOLD', 'HOSES', 'HYDRAULIC_WRENCH', 'HANDLING_TOOLS', 'LT20', 'BT20AND50', 'GT50', 'OTHERS');

-- CreateEnum
CREATE TYPE "Interval" AS ENUM ('LT20', 'BT20AND50', 'GT50');

-- CreateTable
CREATE TABLE "efficiencies" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "available_hours" DOUBLE PRECISION NOT NULL,
    "rig_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "efficiencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Period" (
    "id" UUID NOT NULL,
    "start_hour" TIMESTAMP(3) NOT NULL,
    "end_hour" TIMESTAMP(3) NOT NULL,
    "classification" "PeriodClassification" NOT NULL,
    "description" TEXT,
    "type" "period_type" NOT NULL,
    "efficiency_id" UUID NOT NULL,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FluidRatio" (
    "id" UUID NOT NULL,
    "ratio" "Interval" NOT NULL,
    "efficiency_id" UUID NOT NULL,

    CONSTRAINT "FluidRatio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentRatio" (
    "id" UUID NOT NULL,
    "ratio" "Interval" NOT NULL,
    "efficiency_id" UUID NOT NULL,

    CONSTRAINT "EquipmentRatio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "efficiencies" ADD CONSTRAINT "efficiencies_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "efficiencies" ADD CONSTRAINT "efficiencies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Period" ADD CONSTRAINT "Period_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FluidRatio" ADD CONSTRAINT "FluidRatio_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentRatio" ADD CONSTRAINT "EquipmentRatio_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
