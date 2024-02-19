import {differenceInMinutes, parse} from "date-fns";
import {useGlobalDashboard} from "../../GlobalDashboardContext/useDashboard";
import {getDiffInMinutes} from "../../../../../app/utils/getDiffInMinutes";
import {translateClassification} from "../../../../../app/utils/translateClassification";

export type PieChartData = {
  id: string;
  label: string;
  value: number;
  color: string;
}[];

export const useRepairPeriodsPieChart = () => {
  const {unbilledPeriods} = useGlobalDashboard();

  const colors = [
    // Tons de #a4caca
    "#77b0b0",
    "#66a2a2",
    "#559494",
    "#448686",
    "#336777", // Tons de #77b0b0
    "#499595",
    "#3d7f7f",
    "#316a6a",
    "#265454",
    "#1a4040", // Tons de #499595
    "#1c7b7b",
    "#176b6b",
    "#125c5c",
    "#0d4c4c",
    "#083d3d", // Tons de #1c7b7b
    "#166262",
    "#125555",
    "#0e4848",
    "#0a3b3b",
    "#062e2e", // Tons de #166262
    "#114a4a",
    "#0d3b3b",
    "#093030",
    "#052424",
    "#021616", // Tons de #114a4a
    "#0b3131",
    "#082626",
    "#051a1a",
    "#031010",
    "#020808", // Tons de #0b3131
    "#061919",
    "#041212",
    "#030b0b",
    "#020606",
    "#010303", // Tons de #061919
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
    .filter((period) => period.type === "GLOSS")
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
          value: Number(diffInHours.toFixed(2)),
          color: colors[acc.length % colors.length], // Use modulo para evitar estouro de índice
        });
      } else {
        acc = acc.map((accItem) =>
          accItem.id === classification
            ? {
                ...accItem,
                value: Number((accItem.value + diffInHours).toFixed(2)),
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
