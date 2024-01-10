-- AlterTable
ALTER TABLE "periods" ADD COLUMN     "user_id" UUID;

-- CreateTable
CREATE TABLE "Well" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Well_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Well_name_key" ON "Well"("name");

-- AddForeignKey
ALTER TABLE "periods" ADD CONSTRAINT "periods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Well"("id") ON DELETE SET NULL ON UPDATE CASCADE;
