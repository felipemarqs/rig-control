import {useBillingRigDetailDashboard} from "../../BillingRigDetailDashboardContext/useBillingDashboard";

export const useDataGridCard = () => {
  const {isEmpty, isFetchingBilling, billing} = useBillingRigDetailDashboard();

  return {isEmpty, isFetchingBilling, billing};
};
