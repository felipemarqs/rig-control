import {BarDatum} from "@nivo/bar";
import {useDashboard} from "../../../../DashboardContext/useDashboard";

export const useAverageBarChart = () => {
  const {rigsAverage, selectedRig} = useDashboard();

  const convertedResult: BarDatum[] = rigsAverage.map(({avg, rig, rigId}) => ({
    rigId,
    rig,
    avg: ((avg / 24) * 100).toFixed(2),
  }));

  return {
    data: convertedResult,
    selectedRig,
  };
};
