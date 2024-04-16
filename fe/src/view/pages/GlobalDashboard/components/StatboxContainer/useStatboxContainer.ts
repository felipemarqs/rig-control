import {useGlobalDashboard} from "../../GlobalDashboardContext/useDashboard";

export const useStatboxContainer = () => {
  const {
    statBox: {averageHours, averageHoursPercentage},
    chartData,
  } = useGlobalDashboard();

  let glossHours = 0;
  let repairHours = 0;

  chartData.forEach((data) => {
    if (data.id === "GLOSS") {
      glossHours += data.value;
    }

    if (data.id === "REPAIR") {
      repairHours += data.value;
    }
  });

  console.log("averageHoursPercentage", averageHoursPercentage);

  return {
    glossHours,
    repairHours,
    averageHours,
    averageHoursPercentage,
  };
};
