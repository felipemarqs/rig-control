import {useContext} from "react";
import {BillingDashboardContext} from ".";

export const useBillingDashboard = () => {
  return useContext(BillingDashboardContext);
};
