import {useGlobalDashboard} from "../../GlobalDashboardContext/useDashboard";

export const useDaysNotRegistered = () => {
  const {rigsAverage, totalDaysSelected} = useGlobalDashboard();

  // console.log("repairPeriods", repairPeriods);

  const mappedRigsAverage = rigsAverage
    .map(({count, rig, rigId, state}) => {
      return {
        rig,
        daysNotRegistered: totalDaysSelected - count,
        state,
        rigId,
      };
    })
    .sort((a, b) => b.daysNotRegistered - a.daysNotRegistered);

  return {
    mappedRigsAverage,
  };
};
