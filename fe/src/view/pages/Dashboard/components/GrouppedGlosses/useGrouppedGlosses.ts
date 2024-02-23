import {useDashboard} from "../../DashboardContext/useDashboard";
import {translateClassification} from "../../../../../app/utils/translateClassification";
import {getDiffInMinutes} from "../../../../../app/utils/getDiffInMinutes";
import {parse} from "date-fns";
import {formatNumberWithFixedDecimals} from "../../../../../app/utils/formatNumberWithFixedDecimals";

interface EquipmentData {
  equipment: string;
  qty: number;
  totalHours: number;
}

interface GrouppedEquipmentData {
  totalRepairHours: number;
  groupedData: EquipmentData[];
}

interface GlossData {
  gloss: string;
  qty: number;
  totalHours: number;
}

interface GrouppedGlossData {
  totalRepairHours: number;
  groupedData: GlossData[];
}

export const useGrouppedRepairs = () => {
  const {repairPeriods, glossPeriods} = useDashboard();

  const glossGroupedData: GrouppedGlossData = glossPeriods.reduce(
    (acc: GrouppedGlossData, current) => {
      const foundIndex = acc.groupedData.findIndex(
        (item) => item.gloss === current.classification
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

      acc.totalRepairHours += formatNumberWithFixedDecimals(
        getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
        2
      );

      if (foundIndex === -1) {
        acc.groupedData.push({
          gloss: current.classification,
          qty: 1,
          totalHours: formatNumberWithFixedDecimals(
            getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
            2
          ),
        });
      } else {
        acc.groupedData[foundIndex].qty += 1;
        acc.groupedData[foundIndex].totalHours += formatNumberWithFixedDecimals(
          getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
          2
        );
      }

      return acc;
    },
    {totalRepairHours: 0, groupedData: []}
  );

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

      acc.totalRepairHours += formatNumberWithFixedDecimals(
        getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
        2
      );

      if (foundIndex === -1) {
        acc.groupedData.push({
          equipment: translateClassification(current.classification)!,
          qty: 1,
          totalHours: formatNumberWithFixedDecimals(
            getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
            2
          ),
        });
      } else {
        acc.groupedData[foundIndex].qty += 1;
        acc.groupedData[foundIndex].totalHours += formatNumberWithFixedDecimals(
          getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
          2
        );
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
    glossGroupedData,
  };
};
