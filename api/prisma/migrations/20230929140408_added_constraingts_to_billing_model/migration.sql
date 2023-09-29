/*
  Warnings:

  - You are about to drop the column `mix_tank_demobilization_ammount` on the `billings` table. All the data in the column will be lost.
  - You are about to drop the column `mix_tank_dtm_ammount` on the `billings` table. All the data in the column will be lost.
  - You are about to drop the column `mix_tank_mobilization_ammount` on the `billings` table. All the data in the column will be lost.
  - You are about to drop the column `mix_tank_operator_ammount` on the `billings` table. All the data in the column will be lost.
  - You are about to drop the column `power_swivel_ammount` on the `billings` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `billing_configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `christmas_tree_disassembly_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_demobilization_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_dtm_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_mobilization_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mix_tank_operator_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `munck_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `power_swivel_amount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `truck_TankAmount` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `billings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "billing_configurations" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "billings" DROP COLUMN "mix_tank_demobilization_ammount",
DROP COLUMN "mix_tank_dtm_ammount",
DROP COLUMN "mix_tank_mobilization_ammount",
DROP COLUMN "mix_tank_operator_ammount",
DROP COLUMN "power_swivel_ammount",
ADD COLUMN     "christmas_tree_disassembly_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "mix_tank_demobilization_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_dtm_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_mobilization_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mix_tank_operator_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "munck_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "power_swivel_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "truck_TankAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" TEXT;
