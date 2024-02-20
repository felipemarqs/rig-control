import { parse } from "date-fns";
import { useGlobalDashboard } from "../../GlobalDashboardContext/useDashboard";
import { getDiffInMinutes } from "../../../../../app/utils/getDiffInMinutes";

export type PieChartData = {
  id: string;
  label: string;
  value: number;
  color: string;
}[];

export const useUnbilledPeriodsPieChart = () => {
  const { unbilledPeriods, handleSelectedPieChartViewChange } =
    useGlobalDashboard();

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

  const chartData = unbilledPeriods.reduce(
    (acc, current) => {
      const parsedStartHour = parse(
        current.startHour.split("T")[1].slice(0, 5),
        "HH:mm",
        new Date()
      );
      const parsedEndHour = parse(
        current.endHour.split("T")[1].slice(0, 5),
        "HH:mm",
        new Date()
      );

      const diffInMinutes =
        getDiffInMinutes(parsedEndHour, parsedStartHour) / 60;

      acc = acc.map((accItem) =>
        accItem.id === current.type
          ? { ...accItem, value: (accItem.value += diffInMinutes) }
          : accItem
      );

      return acc;
    },
    [
      {
        id: "REPAIR",
        label: "Reparo",
        value: 0,
        color: "#1c7b7b",
      },
      {
        id: "GLOSS",
        label: "Glosa",
        value: 0,
        color: "#81c460",
      },
    ]
  );

  return {
    chartData,
    handleSelectedPieChartViewChange,
  };
};
