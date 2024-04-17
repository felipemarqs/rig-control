import {useBillingDashboard} from "../../../../BillingDashboardContext/useBillingDashboard";

export const useBarChart = () => {
  const {billings} = useBillingDashboard();

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
