import {useGlobalDashboard} from "../../GlobalDashboardContext/useDashboard";

export const useDaysNotRegistered = () => {
  const {mappedRigsAverage} = useGlobalDashboard();

  return {
    mappedRigsAverage,
  };
};
