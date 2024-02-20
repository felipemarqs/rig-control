import { differenceInMinutes, parse } from "date-fns";
import { useGlobalDashboard } from "../../GlobalDashboardContext/useDashboard";

import { translateClassification } from "../../../../../app/utils/translateClassification";

export type PieChartData = {
  id: string;
  label: string;
  value: number;
  color: string;
}[];

export const useRepairPeriodsPieChart = () => {
  const { unbilledPeriods, selectedPieChartView } = useGlobalDashboard();

  const colors = [
    "#336777",
    "#81c460",
    "#679d4d",
    "#1c7b7b",
    "#0d4c4c",
    "#083d3d",
    "#166262",
    "#0a3b3b",
    "#062e2e",
    "#114a4a",
    "#81c460",
    "#5c8c44",
    "#375625",
    "#2c451b",
    "#213411",
    "#344e26",
  ];

  const data = [
    {
      id: "c",
      label: "c",
      value: 432,
      color: "#1c7b7b",
    },
    {
      id: "go",
      label: "go",
      value: 51,
      color: "#81c460",
    },
  ];

  const parseHour = (hourString: string) =>
    parse(hourString.split("T")[1].slice(0, 5), "HH:mm", new Date());

  const chartData = unbilledPeriods
    .filter((period) => period.type === selectedPieChartView)
    .reduce((acc: PieChartData, current) => {
      const classification = translateClassification(current.classification)!;
      const foundItem = acc.find((accItem) => accItem.id === classification)!;

      const parsedStartHour = parseHour(current.startHour);
      const parsedEndHour = parseHour(current.endHour);
      const diffInHours =
        differenceInMinutes(parsedEndHour, parsedStartHour) / 60;

      if (!foundItem) {
        acc.push({
          id: classification,
          label: classification,
          value: Math.ceil(Number(diffInHours.toFixed(2))),
          color: colors[acc.length % colors.length], // Use modulo para evitar estouro de índice
        });
      } else {
        acc = acc.map((accItem) =>
          accItem.id === classification
            ? {
                ...accItem,
                value: Math.ceil(
                  Number((accItem.value + diffInHours).toFixed(2))
                ),
              }
            : accItem
        );
      }

      return acc;
    }, []);

  console.log("ChartData", chartData);
  return {
    chartData,
  };
};
