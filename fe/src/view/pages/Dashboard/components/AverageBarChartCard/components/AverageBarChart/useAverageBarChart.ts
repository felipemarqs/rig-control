import {BarDatum} from "@nivo/bar";
import {useDashboard} from "../../../../DashboardContext/useDashboard";
import {months} from "@/app/utils/months";

export const useAverageBarChart = () => {
  const {selectedRig, average} = useDashboard();

  const convertedResul: BarDatum[] = average.map(({avg, month}) => {
    return {
      month: `${months[Number(month.split("-")[1]) - 1].label} de ${
        month.split("-")[0]
      } `,
      avg: ((avg / 24) * 100).toFixed(2),
    };
  });

  return {
    data: convertedResul,
    selectedRig,
  };
};
