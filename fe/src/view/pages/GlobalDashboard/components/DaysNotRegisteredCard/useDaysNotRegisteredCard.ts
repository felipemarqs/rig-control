import {useGlobalDashboard} from "../../GlobalDashboardContext/useDashboard";

export const useDaysNotRegisteredCard = () => {
  const {mappedRigsAverage} = useGlobalDashboard();

  return {
    mappedRigsAverage,
  };
};
