import {useBillingDashboard} from "../../BillingDashboardContext/useBillingDashboard";

export const useRigBillingConfigListCard = () => {
  const {configs, handleOpenEditConfigModal} = useBillingDashboard();

  return {configs, handleOpenEditConfigModal};
};
