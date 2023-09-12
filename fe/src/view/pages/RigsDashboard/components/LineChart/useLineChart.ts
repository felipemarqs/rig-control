import {useDashboard} from "../../RigsDashboardContext/useDashboard";
import {Efficiency} from "../../entities/Efficiency";

interface OutputData {
  id: string;
  x: string;
  y: number;
}

export const useLineChart = () => {
  const {efficiencies, user} = useDashboard();

  let data: [
    {
      id: string;
      color: string;
      data: OutputData[];
    }
  ] = [
    {
      id: user?.rigs[0].rig.name!,
      color: "#1c7b7b",
      data: [],
    },
  ];

  const formatEfficiencyToLineChart = (efficiencies: Efficiency[]) => {
    efficiencies.forEach(({availableHours, id, date}) => {
      const formattedDate = `${new Date(date)
        .getDate()
        .toString()
        .padStart(2, "0")}/${(new Date(date).getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      const availableHoursPercentage = (availableHours * 100) / 24;

      data[0].data.push({
        id: id,
        x: formattedDate,
        y: Number(availableHoursPercentage.toFixed(2)),
      });
    });
  };

  formatEfficiencyToLineChart(efficiencies);

  return {data};
};
