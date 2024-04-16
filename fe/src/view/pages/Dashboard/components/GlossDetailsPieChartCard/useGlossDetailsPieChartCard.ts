import {useDashboard} from "../../DashboardContext/useDashboard";

export const useGlossDetailsPieChartCard = () => {
  const {
    handleRemoveSelectedEquipment,
    selectedGloss,
    isFetchingEfficiencies,
    repairPeriods,
  } = useDashboard();
  return {
    handleRemoveSelectedEquipment,
    selectedGloss,
    isFetchingEfficiencies,
    repairPeriods,
  };
};
