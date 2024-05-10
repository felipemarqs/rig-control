import {BarDatum} from "@nivo/bar";
import {useDashboard} from "../../../../DashboardContext/useDashboard";

export const useAverageBarChart = () => {
  const {selectedRig, average} = useDashboard();

  const convertedResul: BarDatum[] = average.map(({avg, month}) => {
    return {
      rig: month,
      avg: ((avg / 24) * 100).toFixed(2),
    };
  });

  return {
    data: convertedResul,
    selectedRig,
  };
};
