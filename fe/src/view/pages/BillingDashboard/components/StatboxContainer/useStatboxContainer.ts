import {useBillingDashboard} from "../../BillingDashboardContext/useBillingDashboard";

export const useStatboxContainer = () => {
  const {
    totalAmount,
    totalGlossAmount,
    totalRepairAmount,
    totalUnbilledAmount,
    isFetchingBillings,
  } = useBillingDashboard();

  return {
    totalAmount,
    totalGlossAmount,
    totalRepairAmount,
    isFetchingBillings,
    totalUnbilledAmount,
  };
};
