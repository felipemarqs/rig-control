import {convertMonthToName} from "../../../../../app/utils/convertMonthToName";
import {useDashboard} from "../../DashboardContext/useDashboard";

export const useBarChart = () => {
  const {average} = useDashboard();

  const data = convertMonthToName(average);

  return {
    data,
  };
};
