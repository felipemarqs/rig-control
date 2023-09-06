-- CreateTable
CREATE TABLE "billings" (
    "id" UUID NOT NULL,
    "efficiency_id" UUID NOT NULL,
    "available_hour_amount" DOUBLE PRECISION NOT NULL,
    "gloss_hour_amount" DOUBLE PRECISION NOT NULL,
    "dtm_lt_20_amount" DOUBLE PRECISION NOT NULL,
    "dtm_bt_20_and_50_amount" DOUBLE PRECISION NOT NULL,
    "dtm_gt_50_amount" DOUBLE PRECISION NOT NULL,
    "fluid_lt_20_amount" DOUBLE PRECISION NOT NULL,
    "fluid_bt_20_and_50_amount" DOUBLE PRECISION NOT NULL,
    "fluid_gt_50_amount" DOUBLE PRECISION NOT NULL,
    "equipment_lt_20_amount" DOUBLE PRECISION NOT NULL,
    "equipment_bt_20_and_50_amount" DOUBLE PRECISION NOT NULL,
    "equipment_gt_50_amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "billings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "billing_configurations" ADD CONSTRAINT "billing_configurations_rig_id_fkey" FOREIGN KEY ("rig_id") REFERENCES "rigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billings" ADD CONSTRAINT "billings_efficiency_id_fkey" FOREIGN KEY ("efficiency_id") REFERENCES "efficiencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
