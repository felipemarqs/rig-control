import {useGlobalDashboard} from "../../GlobalDashboardContext/useDashboard";

export const useDaysNotRegistered = () => {
  const {mappedRigsAverage} = useGlobalDashboard();

  // console.log("repairPeriods", repairPeriods);

  return {
    mappedRigsAverage,
  };
};
