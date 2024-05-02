import {useFiltersContext} from "@/app/hooks/useFiltersContext";
import {useDashboard} from "@/view/pages/Dashboard/DashboardContext/useDashboard";
import {useNavigate} from "react-router-dom";

export const useCalendarChart = () => {
  const {filters} = useFiltersContext();
  const navigate = useNavigate();

  let dataString = filters.startDate.split("T")[0];

  if (dataString.slice(5) === "01-01") {
    let date = new Date(dataString);
    date.setDate(date.getDate() + 1);
    dataString = date.toISOString().slice(0, 10);
  }

  const calendarRange = {
    from: dataString,
    to: filters.endDate.split("T")[0],
  };

  const {efficiencies} = useDashboard();

  const data = efficiencies.map(({id, availableHours, date}) => ({
    id,
    value: availableHours,
    day: date.toString().split("T")[0],
  }));

  return {
    calendarRange,
    data,
    navigate,
  };
};
