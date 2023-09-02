import { useDashboard } from "../../DashboardContext/useDashboard";
import { Efficiency } from "../../entities/Efficiency";

interface OutputData {
  id: string;
  x: string;
  y: number;
}

export const useLineChart = () => {
  const { eficiencies, selectedRig } = useDashboard();

  let data: [
    {
      id: string;
      color: string;
      data: OutputData[];
    }
  ] = [
    {
      id: selectedRig,
      color: "#1c7b7b",
      data: [],
    },
  ];

  const formatEfficiencyToLineChart = (eficiencies: Efficiency[]) => {
    eficiencies.forEach(({ availableHours, id, date }) => {
      const formattedDate = `${new Date(date)
        .getDate()
        .toString()
        .padStart(2, "0")}/${(new Date(date).getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      data[0].data.push({
        id: id,
        x: formattedDate,
        y: availableHours,
      });
    });
  };

  formatEfficiencyToLineChart(eficiencies);

  return { data };
};
