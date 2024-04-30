import {useGlobalDashboard} from "../../../GlobalDashboardContext/useDashboard";

export type PieChartData = {
  id: string;
  label: string;
  value: number;
  color: string;
}[];

export const useUnbilledPeriodsPieChart = () => {
  const {handleSelectedPieChartViewChange, chartData} = useGlobalDashboard();

  return {
    chartData,
    handleSelectedPieChartViewChange,
  };
};
