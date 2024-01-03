import {useBillingRigDetailDashboard} from "../../BillingRigDetailDashboardContext/useBillingDashboard";

export const useBarChart = () => {
  const {billing} = useBillingRigDetailDashboard();

  const data = billing.map(({rigname, total}) => {
    return {
      rig: rigname,
      total: total,
    };
  });

  return {
    data,
  };
};
