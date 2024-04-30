-- AlterTable
ALTER TABLE "Well" ADD COLUMN     "contract_id" UUID;

-- AddForeignKey
ALTER TABLE "Well" ADD CONSTRAINT "Well_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
