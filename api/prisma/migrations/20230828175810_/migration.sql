/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `rigs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rigs_name_key" ON "rigs"("name");
