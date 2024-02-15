import {useDashboard} from "../../DashboardContext/useDashboard";
import {translateClassification} from "../../../../../app/utils/translateClassification";
import {getDiffInMinutes} from "../../../../../app/utils/getDiffInMinutes";
import {parse} from "date-fns";

interface EquipmentData {
  equipment: string;
  qty: number;
  totalHours: number;
}

interface GrouppedEquipmentData {
  totalRepairHours: number;
  groupedData: EquipmentData[];
}

export const useBarChart = () => {
  const {repairPeriods} = useDashboard();

  // console.log("repairPeriods", repairPeriods);

  const repairGroupedData: GrouppedEquipmentData = repairPeriods.reduce(
    (acc: GrouppedEquipmentData, current) => {
      const foundIndex = acc.groupedData.findIndex(
        (item) =>
          item.equipment === translateClassification(current.classification)
      );

      const parsedStartHour = parse(
        current.startHour.split("T")[1].slice(0, 5),
        "HH:mm",
        new Date()
      );
      const parsedEndHour = parse(
        current.endHour.split("T")[1].slice(0, 5),
        "HH:mm",
        new Date()
      );

      acc.totalRepairHours +=
        getDiffInMinutes(parsedEndHour, parsedStartHour) / 60;

      if (foundIndex === -1) {
        acc.groupedData.push({
          equipment: translateClassification(current.classification)!,
          qty: 1,
          totalHours: getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
        });
      } else {
        acc.groupedData[foundIndex].qty += 1;
        acc.groupedData[foundIndex].totalHours +=
          getDiffInMinutes(parsedEndHour, parsedStartHour) / 60;
      }

      return acc;
    },
    {totalRepairHours: 0, groupedData: []}
  );

  const convertedResult = repairGroupedData.groupedData.sort(
    (a, b) => b.totalHours - a.totalHours
  );

  return {
    data: convertedResult,
    repairGroupedData,
  };
};
