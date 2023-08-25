-- CreateEnum
CREATE TYPE "UF" AS ENUM ('AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO');

-- CreateEnum
CREATE TYPE "access_level" AS ENUM ('ADM', 'USER');

-- CreateTable
CREATE TABLE "rigs" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "state" "UF" NOT NULL,

    CONSTRAINT "rigs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access_level" "access_level" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_rigs" (
    "user_id" UUID NOT NULL,
    "rig_id" UUID NOT NULL,

    CONSTRAINT "users_rigs_pkey" PRIMARY KEY ("user_id","rig_id")
);

-- AddForeignKey
ALTER TABLE "users_rigs" ADD CONSTRAINT "users_rigs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_rigs" ADD CONSTRAINT "users_rigs_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
