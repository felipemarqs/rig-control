-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'FINISHED');

-- CreateTable
CREATE TABLE "DeletionRequest" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "efficiency_id" UUID NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeletionRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeletionRequest" ADD CONSTRAINT "DeletionRequest_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeletionRequest" ADD CONSTRAINT "DeletionRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
