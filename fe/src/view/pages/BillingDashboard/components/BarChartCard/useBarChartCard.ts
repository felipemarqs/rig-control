import {useBillingDashboard} from "../../BillingDashboardContext/useBillingDashboard";

export const useBarChardCard = () => {
  const {isFetchingBillings} = useBillingDashboard();

  return {isFetchingBillings};
};
