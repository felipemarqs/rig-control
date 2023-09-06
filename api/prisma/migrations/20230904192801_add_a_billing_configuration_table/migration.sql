-- CreateTable
CREATE TABLE "billing_configurations" (
    "id" UUID NOT NULL,
    "rig_id" UUID NOT NULL,
    "available_hour_tax" DOUBLE PRECISION NOT NULL,
    "gloss_hour_tax" DOUBLE PRECISION NOT NULL,
    "dtm_lt_20_tax" DOUBLE PRECISION NOT NULL,
    "dtm_bt_20_and_50_tax" DOUBLE PRECISION NOT NULL,
    "dtm_gt_50_tax" DOUBLE PRECISION NOT NULL,
    "fluid_ratio_lt_20_tax" DOUBLE PRECISION NOT NULL,
    "fluid_ratio_bt_20_and_50_tax" DOUBLE PRECISION NOT NULL,
    "fluid_ratio_gt_50_tax" DOUBLE PRECISION NOT NULL,
    "equipment_ratio_lt_20_tax" DOUBLE PRECISION NOT NULL,
    "equipment_ratio_bt_20_and_50_tax" DOUBLE PRECISION NOT NULL,
    "equipment_ratio_gt_50_tax" DOUBLE PRECISION NOT NULL,
    "readjustment" DOUBLE PRECISION NOT NULL,
    "mobilization" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "billing_configurations_pkey" PRIMARY KEY ("id")
);
