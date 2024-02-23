import {differenceInMinutes, parse} from "date-fns";
import {useGlobalDashboard} from "../../GlobalDashboardContext/useDashboard";

import {translateClassification} from "../../../../../app/utils/translateClassification";

export type PieChartData = {
  id: string;
  label: string;
  value: number;
  color: string;
}[];

export const usePeriodsDetailsPieChart = () => {
  const {unbilledPeriods, selectedPieChartView, handleCloseDetailsGraph} =
    useGlobalDashboard();

  const pieChartColors = [
    "#1c7b7b", // primary 500
    "#81c460",
    "#ffda79", // Amarelo
    "#564787", // Roxo
    "#f38181", // Rosa
    "#84fab0", // Verde claro
    "#ff5722", // Laranja
    "#416788", // Azul marinho
    "#b8de6f", // Verde limão
    "#94618e", // Roxo claro
    "#ffa45b", // Pêssego
    "#a3de83", // Verde pastel
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
          color: pieChartColors[acc.length % pieChartColors.length], // Use modulo para evitar estouro de índice
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

  return {
    chartData,
    selectedPieChartView,
    handleCloseDetailsGraph,
  };
};
