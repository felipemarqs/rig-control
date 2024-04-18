import React from "react";
import {createContext} from "react";
import {useFiltersContext} from "@/app/hooks/useFiltersContext";
import {filterOptions} from "../../../../app/utils/filterOptions";
import {SelectOptions} from "../../../../app/entities/SelectOptions";
import {getTotals, totalsInterface} from "../../../../app/utils/getTotals";
import {useBillingByRigId} from "../../../../app/hooks/billings/useBillingByRigId";
import {useEfficiencies} from "../../../../app/hooks/efficiencies/useEfficiencies";
import {BillingByRigIdResponse} from "../../../../app/services/billingServices/getbyRigId";
import {EfficienciesResponse} from "@/app/services/efficienciesService/getAll";

interface BillingRigDetailDashboardContextValue {
  isFetchingBilling: boolean;
  handleApplyFilters(): void;
  billing: Array<BillingByRigIdResponse>;
  isEmpty: boolean;
  totalAmount: number;
  filterOptions: SelectOptions;
  totals: totalsInterface;
  efficiencies: EfficienciesResponse;
  isFetchingEfficiencies: boolean;
}

export const BillingRigDetailDashboardContext = createContext(
  {} as BillingRigDetailDashboardContextValue
);

export const BillingRigDetailDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {filters} = useFiltersContext();

  const {billing, refetchBilling, isFetchingBilling} =
    useBillingByRigId(filters);
  const {efficiencies, refetchEffciencies, isFetchingEfficiencies} =
    useEfficiencies(filters);

  const totals = getTotals(efficiencies);

  console.log("totals", totals);
  console.log("billing", billing);

  const isEmpty: boolean = billing.length === 0;

  const totalAmount: number = isEmpty ? 0 : billing[0].total;

  const handleApplyFilters = () => {
    refetchBilling();
    refetchEffciencies();
  };

  return (
    <BillingRigDetailDashboardContext.Provider
      value={{
        totals,
        filterOptions,
        totalAmount,
        isFetchingBilling,
        handleApplyFilters,
        billing,
        isEmpty,
        efficiencies,
        isFetchingEfficiencies,
      }}
    >
      {children}
    </BillingRigDetailDashboardContext.Provider>
  );
};
