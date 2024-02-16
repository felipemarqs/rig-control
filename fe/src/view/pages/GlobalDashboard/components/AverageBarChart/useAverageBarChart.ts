import {BarDatum} from "@nivo/bar";
import {useGlobalDashboard} from "../../GlobalDashboardContext/useDashboard";

export const useAverageBarChart = () => {
  const {rigsAverage} = useGlobalDashboard();

  const convertedResult: BarDatum[] = rigsAverage.map(({avg, rig, rigId}) => ({
    rigId,
    rig,
    avg: ((avg / 24) * 100).toFixed(2),
  }));

  return {
    data: convertedResult,
  };
};
