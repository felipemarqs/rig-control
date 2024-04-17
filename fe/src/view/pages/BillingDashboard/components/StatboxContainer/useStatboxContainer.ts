import {useBillingDashboard} from "../../BillingDashboardContext/useBillingDashboard";

export const useStatboxContainer = () => {
  const {
    totalAmount,
    totalGlossAmount,
    totalRepairAmount,
    totalUnbilledAmount,
  } = useBillingDashboard();

  return {
    totalAmount,
    totalGlossAmount,
    totalRepairAmount,
    totalUnbilledAmount,
  };
};
