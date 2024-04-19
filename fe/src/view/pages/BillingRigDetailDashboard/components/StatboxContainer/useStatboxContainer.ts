import {useBillingRigDetailDashboard} from "../../BillingRigDetailDashboardContext/useBillingDashboard";

export const useStatboxContainer = () => {
  const {totalAmount, billing} = useBillingRigDetailDashboard();

  const totalGlossAmount = 1000;
  const totalRepairAmount =
    billing.length != 0 ? billing[0].repairhouramount : 0;
  const totalUnbilledAmount =
    billing.length != 0 ? billing[0].glosshouramount : 0;

  return {
    totalAmount,
    totalGlossAmount,
    totalRepairAmount,
    totalUnbilledAmount,
  };
};
