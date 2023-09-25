/*
  Warnings:

  - Added the required column `contract_id` to the `rigs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "billing_configurations" DROP CONSTRAINT "billing_configurations_rig_id_fkey";

-- DropForeignKey
ALTER TABLE "efficiencies" DROP CONSTRAINT "efficiencies_rig_id_fkey";

-- AlterTable
ALTER TABLE "rigs" ADD COLUMN     "contract_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "contracts" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contracts_name_key" ON "contracts"("name");

-- AddForeignKey
ALTER TABLE "rigs" ADD CONSTRAINT "rigs_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "efficiencies" ADD CONSTRAINT "efficiencies_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_configurations" ADD CONSTRAINT "billing_configurations_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
