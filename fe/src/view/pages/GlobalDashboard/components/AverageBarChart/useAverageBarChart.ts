import {BarDatum, ComputedDatum} from "@nivo/bar";
import {useGlobalDashboard} from "../../GlobalDashboardContext/useDashboard";
import {useFiltersContext} from "../../../../../app/hooks/useFiltersContext";
import {useNavigate} from "react-router-dom";

export const useAverageBarChart = () => {
  const {rigsAverage, mappedRigsAverage} = useGlobalDashboard();

  const {handleChangeRig} = useFiltersContext();

  const navigate = useNavigate();

  const convertedResult: BarDatum[] = rigsAverage.map(({avg, rig, rigId}) => ({
    rigId,
    rig,
    avg: ((avg / 24) * 100).toFixed(2),
  }));

  const getBarColor = (params: ComputedDatum<BarDatum>) => {
    const rigFound = mappedRigsAverage.find(({rig}) => rig === params.data.rig);
    return rigFound?.daysNotRegistered! > 0 ? "#fc5050" : "#1c7b7b";
  };
  return {
    data: convertedResult,
    getBarColor,
    handleChangeRig,
    navigate,
  };
};
