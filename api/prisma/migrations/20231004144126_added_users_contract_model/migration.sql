-- CreateTable
CREATE TABLE "users_contracts" (
    "user_id" UUID NOT NULL,
    "contract_id" UUID NOT NULL,

    CONSTRAINT "users_contracts_pkey" PRIMARY KEY ("user_id","contract_id")
);

-- AddForeignKey
ALTER TABLE "users_contracts" ADD CONSTRAINT "users_contracts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_contracts" ADD CONSTRAINT "users_contracts_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
