-- AlterTable
ALTER TABLE "billing_configurations" ADD COLUMN     "munck_truck_tax" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "truck_tank_tax" DOUBLE PRECISION DEFAULT 0;
