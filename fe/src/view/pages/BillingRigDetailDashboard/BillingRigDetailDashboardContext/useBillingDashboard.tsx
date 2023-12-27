import {useContext} from "react";
import {BillingRigDetailDashboardContext} from ".";

export const useBillingRigDetailDashboard = () => {
  return useContext(BillingRigDetailDashboardContext);
};
