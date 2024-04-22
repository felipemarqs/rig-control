import {useBillingDashboard} from "../../BillingDashboardContext/useBillingDashboard";

export const useRigBillingConfigListCard = () => {
  const {
    configs,
    handleOpenEditConfigModal,
    isFetchingConfig,
    isFetchingBillings,
  } = useBillingDashboard();

  const isFetching = isFetchingConfig || isFetchingBillings;

  return {configs, handleOpenEditConfigModal, isFetching};
};
