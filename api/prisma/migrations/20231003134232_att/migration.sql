-- CreateEnum
CREATE TYPE "UF" AS ENUM ('AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO');

-- CreateEnum
CREATE TYPE "access_level" AS ENUM ('ADM', 'USER');

-- CreateEnum
CREATE TYPE "period_type" AS ENUM ('GLOSS', 'REPAIR', 'DTM', 'WORKING');

-- CreateEnum
CREATE TYPE "PeriodClassification" AS ENUM ('WORKING', 'LABOR', 'PROCESS', 'LOGISTICS', 'SECURITY', 'RIG_CAR', 'MAST', 'RIG_WINCH', 'RIG_TRANSMISSION', 'UCI', 'MUD_TANK', 'TRAILER', 'MUD_BOMB', 'PIPE_RACK', 'BOP', 'CHOKE_MANIFOLD', 'HOSES', 'HYDRAULIC_WRENCH', 'HANDLING_TOOLS', 'LT20', 'BT20AND50', 'GT50', 'OTHERS');

-- CreateEnum
CREATE TYPE "Interval" AS ENUM ('LT20', 'BT20AND50', 'GT50');

-- CreateTable
CREATE TABLE "rigs" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "contract_id" UUID NOT NULL,
    "state" "UF" NOT NULL,

    CONSTRAINT "rigs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access_level" "access_level" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_rigs" (
    "user_id" UUID NOT NULL,
    "rig_id" UUID NOT NULL,

    CONSTRAINT "users_rigs_pkey" PRIMARY KEY ("user_id","rig_id")
);

-- CreateTable
CREATE TABLE "efficiencies" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "available_hours" DOUBLE PRECISION NOT NULL,
    "dtm_hours" DOUBLE PRECISION NOT NULL,
    "rig_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "efficiencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periods" (
    "id" UUID NOT NULL,
    "start_hour" TIMESTAMP(3) NOT NULL,
    "end_hour" TIMESTAMPTZ NOT NULL,
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

-- CreateTable
CREATE TABLE "billing_configurations" (
    "id" UUID NOT NULL,
    "rig_id" UUID NOT NULL,
    "available_hour_tax" DOUBLE PRECISION NOT NULL,
    "dtm_hour_tax" DOUBLE PRECISION DEFAULT 0,
    "gloss_hour_tax" DOUBLE PRECISION NOT NULL,
    "dtm_lt_20_tax" DOUBLE PRECISION DEFAULT 0,
    "dtm_bt_20_and_50_tax" DOUBLE PRECISION DEFAULT 0,
    "dtm_gt_50_tax" DOUBLE PRECISION DEFAULT 0,
    "fluid_ratio_lt_20_tax" DOUBLE PRECISION DEFAULT 0,
    "fluid_ratio_bt_20_and_50_tax" DOUBLE PRECISION DEFAULT 0,
    "fluid_ratio_gt_50_tax" DOUBLE PRECISION DEFAULT 0,
    "equipment_ratio_lt_20_tax" DOUBLE PRECISION DEFAULT 0,
    "equipment_ratio_bt_20_and_50_tax" DOUBLE PRECISION DEFAULT 0,
    "equipment_ratio_gt_50_tax" DOUBLE PRECISION DEFAULT 0,
    "truck_cart_rent_tax" DOUBLE PRECISION DEFAULT 0,
    "extra_trailer" DOUBLE PRECISION DEFAULT 0,
    "power_swivel" DOUBLE PRECISION DEFAULT 0,
    "transportation_tax" DOUBLE PRECISION DEFAULT 0,
    "truck_km_tax" DOUBLE PRECISION DEFAULT 0,
    "bob_rent_tax" DOUBLE PRECISION DEFAULT 0,
    "christmas_tree_disassembly_tax" DOUBLE PRECISION DEFAULT 0,
    "mix_tank_month_rent_tax" DOUBLE PRECISION DEFAULT 0,
    "mix_tank_hour_rent_tax" DOUBLE PRECISION DEFAULT 0,
    "generator_fuel_tax" DOUBLE PRECISION DEFAULT 0,
    "mix_tank_operator_tax" DOUBLE PRECISION DEFAULT 0,
    "mix_tank_dtm_tax" DOUBLE PRECISION DEFAULT 0,
    "mix_tank_mobilization_tax" DOUBLE PRECISION DEFAULT 0,
    "mix_tank_demobilization_tax" DOUBLE PRECISION DEFAULT 0,
    "sucking_truck_tax" DOUBLE PRECISION DEFAULT 0,
    "truck_tank_tax" DOUBLE PRECISION DEFAULT 0,
    "munck_truck_tax" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "readjustment" DOUBLE PRECISION NOT NULL,
    "mobilization" DOUBLE PRECISION DEFAULT 0,
    "demobilization" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "billing_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billings" (
    "id" UUID NOT NULL,
    "rig_id" UUID NOT NULL,
    "efficiency_id" UUID NOT NULL,
    "available_hour_amount" DOUBLE PRECISION NOT NULL,
    "dtm_hour_amount" DOUBLE PRECISION NOT NULL,
    "gloss_hour_amount" DOUBLE PRECISION NOT NULL,
    "dtm_lt_20_amount" DOUBLE PRECISION NOT NULL,
    "dtm_bt_20_and_50_amount" DOUBLE PRECISION NOT NULL,
    "dtm_gt_50_amount" DOUBLE PRECISION NOT NULL,
    "fluid_lt_20_amount" DOUBLE PRECISION NOT NULL,
    "fluid_bt_20_and_50_amount" DOUBLE PRECISION NOT NULL,
    "fluid_gt_50_amount" DOUBLE PRECISION NOT NULL,
    "equipment_lt_20_amount" DOUBLE PRECISION NOT NULL,
    "equipment_bt_20_and_50_amount" DOUBLE PRECISION NOT NULL,
    "equipment_gt_50_amount" DOUBLE PRECISION NOT NULL,
    "mobilization_amount" DOUBLE PRECISION NOT NULL,
    "demobilization_amount" DOUBLE PRECISION NOT NULL,
    "extra_trailer_amount" DOUBLE PRECISION NOT NULL,
    "power_swivel_amount" DOUBLE PRECISION NOT NULL,
    "truck_cart_rent_amount" DOUBLE PRECISION NOT NULL,
    "transportation_amount" DOUBLE PRECISION NOT NULL,
    "truck_km_amount" DOUBLE PRECISION NOT NULL,
    "bob_rent_amount" DOUBLE PRECISION NOT NULL,
    "mix_tank_month_rent_amount" DOUBLE PRECISION NOT NULL,
    "mix_tank_hour_rent_amount" DOUBLE PRECISION NOT NULL,
    "generator_fuel_amount" DOUBLE PRECISION NOT NULL,
    "mix_tank_operator_amount" DOUBLE PRECISION NOT NULL,
    "mix_tank_dtm_amount" DOUBLE PRECISION NOT NULL,
    "mix_tank_mobilization_amount" DOUBLE PRECISION NOT NULL,
    "mix_tank_demobilization_amount" DOUBLE PRECISION NOT NULL,
    "sucking_truck_amount" DOUBLE PRECISION NOT NULL,
    "truck_TankAmount" DOUBLE PRECISION NOT NULL,
    "christmas_tree_disassembly_amount" DOUBLE PRECISION NOT NULL,
    "munck_amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "billings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rigs_name_key" ON "rigs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "contracts_name_key" ON "contracts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "rigs" ADD CONSTRAINT "rigs_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_rigs" ADD CONSTRAINT "users_rigs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_rigs" ADD CONSTRAINT "users_rigs_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "efficiencies" ADD CONSTRAINT "efficiencies_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "efficiencies" ADD CONSTRAINT "efficiencies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "periods" ADD CONSTRAINT "periods_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fluid_ratio" ADD CONSTRAINT "fluid_ratio_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_ratio" ADD CONSTRAINT "equipment_ratio_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_configurations" ADD CONSTRAINT "billing_configurations_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billings" ADD CONSTRAINT "billings_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billings" ADD CONSTRAINT "billings_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
