-- CreateTable
CREATE TABLE "SystemVersion" (
    "id" UUID NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemVersion_pkey" PRIMARY KEY ("id")
);
