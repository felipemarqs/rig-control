import {useDashboard} from "../../DashboardContext/useDashboard";

export const useRepairDetailsPieChartCard = () => {
  const {
    handleRemoveSelectedEquipment,
    selectedEquipment,
    isFetchingEfficiencies,
    repairPeriods,
  } = useDashboard();
  return {
    handleRemoveSelectedEquipment,
    selectedEquipment,
    isFetchingEfficiencies,
    repairPeriods,
  };
};
