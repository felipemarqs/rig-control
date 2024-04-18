import {useBillingRigDetailDashboard} from "../../BillingRigDetailDashboardContext/useBillingDashboard";

export const useStatboxContainer = () => {
  const {totalAmount, billing} = useBillingRigDetailDashboard();

  const totalGlossAmount = 1000;
  const totalRepairAmount = billing[0].repairhouramount;
  const totalUnbilledAmount = billing[0].glosshouramount;

  return {
    totalAmount,
    totalGlossAmount,
    totalRepairAmount,
    totalUnbilledAmount,
  };
};
