import {BarDatum} from "@nivo/bar";
import {useDashboard} from "../../DashboardContext/useDashboard";
import {translateClassification} from "../../../../../app/utils/translateClassification";

interface EquipmentItem {
  equipment: string;
  qty: number;
}

export const useBarChart = () => {
  const {repairPeriods} = useDashboard();

  const result: EquipmentItem[] = repairPeriods.reduce(
    (acc: EquipmentItem[], current) => {
      const foundIndex = acc.findIndex(
        (item) => item.equipment === current.classification
      );

      if (foundIndex === -1) {
        // If not found, add a new item to the array
        acc.push({
          equipment: current.classification,
          qty: 1,
        });
      } else {
        // If found, update the quantity
        acc[foundIndex].qty += 1;
      }

      return acc;
    },
    []
  );

  const convertedResult: BarDatum[] = result
    .map((item) => ({
      equipment: translateClassification(item.equipment)!,
      qty: item.qty,
    }))
    .sort((a, b) => a.qty - b.qty);

  return {
    data: convertedResult,
  };
};
