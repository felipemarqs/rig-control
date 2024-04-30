import {useBillingRigDetailDashboard} from "../../BillingRigDetailDashboardContext/useBillingDashboard";

export const useLineChartCard = () => {
  const {isFetchingEfficiencies, isEmpty} = useBillingRigDetailDashboard();
  return {isFetchingEfficiencies, isEmpty};
};
