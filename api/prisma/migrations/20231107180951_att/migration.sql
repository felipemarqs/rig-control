-- DropForeignKey
ALTER TABLE "DeletionRequest" DROP CONSTRAINT "DeletionRequest_efficiency_id_fkey";

-- AddForeignKey
ALTER TABLE "DeletionRequest" ADD CONSTRAINT "DeletionRequest_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
