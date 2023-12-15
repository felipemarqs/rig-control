import {useBillingRigDetailDashboard} from "../../BillingRigDetailDashboardContext/useBillingDashboard";

export const useBarChart = () => {
  const {billings} = useBillingRigDetailDashboard();

  const data = billings.map(({rigname, total}) => {
    return {
      rig: rigname,
      total: total,
    };
  });

  return {
    data,
  };
};
