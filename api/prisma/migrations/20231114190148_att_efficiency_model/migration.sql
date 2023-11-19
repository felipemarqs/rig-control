/*
  Warnings:

  - Added the required column `christmas_tree_disassembly_hours` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_bob_rent` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_demobilization` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_extra_trailer` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_generator_fuel` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_mix_tank_demobilization` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_mix_tank_dtm` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_mix_tank_hour_rent` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_mix_tank_mobilization` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_mix_tank_month_rent` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_mix_tank_operator` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_munck` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_power_swivel` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_sucking_truck` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_transportation` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_truck_cart_rent` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_truck_tank` to the `efficiencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `truck_km_amount` to the `efficiencies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "efficiencies" ADD COLUMN     "christmas_tree_disassembly_hours" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "has_bob_rent" BOOLEAN NOT NULL,
ADD COLUMN     "has_demobilization" BOOLEAN NOT NULL,
ADD COLUMN     "has_extra_trailer" BOOLEAN NOT NULL,
ADD COLUMN     "has_generator_fuel" BOOLEAN NOT NULL,
ADD COLUMN     "has_mix_tank_demobilization" BOOLEAN NOT NULL,
ADD COLUMN     "has_mix_tank_dtm" BOOLEAN NOT NULL,
ADD COLUMN     "has_mix_tank_hour_rent" BOOLEAN NOT NULL,
ADD COLUMN     "has_mix_tank_mobilization" BOOLEAN NOT NULL,
ADD COLUMN     "has_mix_tank_month_rent" BOOLEAN NOT NULL,
ADD COLUMN     "has_mix_tank_operator" BOOLEAN NOT NULL,
ADD COLUMN     "has_munck" BOOLEAN NOT NULL,
ADD COLUMN     "has_power_swivel" BOOLEAN NOT NULL,
ADD COLUMN     "has_sucking_truck" BOOLEAN NOT NULL,
ADD COLUMN     "has_transportation" BOOLEAN NOT NULL,
ADD COLUMN     "has_truck_cart_rent" BOOLEAN NOT NULL,
ADD COLUMN     "has_truck_tank" BOOLEAN NOT NULL,
ADD COLUMN     "truck_km_amount" DOUBLE PRECISION NOT NULL;
