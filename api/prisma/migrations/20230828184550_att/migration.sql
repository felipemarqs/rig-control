-- DropForeignKey
ALTER TABLE "users_rigs" DROP CONSTRAINT "users_rigs_rig_id_fkey";

-- DropForeignKey
ALTER TABLE "users_rigs" DROP CONSTRAINT "users_rigs_user_id_fkey";

-- AlterTable
ALTER TABLE "rigs" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "users_rigs" ADD CONSTRAINT "users_rigs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_rigs" ADD CONSTRAINT "users_rigs_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
