import {useDashboard} from "../../DashboardContext/useDashboard";

export const useStatboxContainer = () => {
  const {
    totalAvailableHours,
    availableHoursPercentage,
    totalUnavailableHours,
    unavailableHoursPercentage,
    totalDtms,
    totalMovimentations,
  } = useDashboard();

  return {
    totalAvailableHours,
    availableHoursPercentage,
    totalUnavailableHours,
    unavailableHoursPercentage,
    totalDtms,
    totalMovimentations,
  };
};
