/*
  Warnings:

  - Added the required column `bob_rent_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `demobilization` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dtm_hour_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extra_trailer` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generator_fuel_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_demobilization_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_dtm_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_hour_rent_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_mobilization_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_month_rent_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_operator_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `power_swivel` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sucking_truck_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportation_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `truck_cart_rent_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `truck_km_tax` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bob_rent_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `demobilization_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dtm_hour_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extra_trailer_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generator_fuel_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_demobilization_ammount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_dtm_ammount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_hour_rent_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_mobilization_ammount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_month_rent_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_operator_ammount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobilization_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `power_swivel_ammount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sucking_truck_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportation_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `truck_cart_rent_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `truck_km_amount` to the `billings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "billing_configurations" ADD COLUMN     "bob_rent_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "demobilization" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dtm_hour_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "extra_trailer" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "generator_fuel_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_demobilization_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_dtm_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_hour_rent_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_mobilization_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_month_rent_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_operator_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "power_swivel" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sucking_truck_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "transportation_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "truck_cart_rent_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "truck_km_tax" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "billings" ADD COLUMN     "bob_rent_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "demobilization_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dtm_hour_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "extra_trailer_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "generator_fuel_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_demobilization_ammount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_dtm_ammount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_hour_rent_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_mobilization_ammount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_month_rent_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_operator_ammount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mobilization_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "power_swivel_ammount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sucking_truck_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "transportation_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "truck_cart_rent_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "truck_km_amount" DOUBLE PRECISION NOT NULL;
