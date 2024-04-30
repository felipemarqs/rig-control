import {useDashboard} from "../../DashboardContext/useDashboard";
import {getDiffInMinutes} from "../../../../../app/utils/getDiffInMinutes";
import {parse} from "date-fns";
import {formatNumberWithFixedDecimals} from "../../../../../app/utils/formatNumberWithFixedDecimals";

interface GlossData {
  id: string;
  gloss: string;
  qty: number;
  totalHours: number;
}

interface GrouppedGlossData {
  totalRepairHours: number;
  groupedData: GlossData[];
}

export const useGrouppedGlosses = () => {
  const {glossPeriods, handleSelectGloss} = useDashboard();

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
          id: current.classification,
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

  const convertedResult = glossGroupedData.groupedData.sort(
    (a, b) => b.totalHours - a.totalHours
  );

  return {
    data: convertedResult,
    glossGroupedData,
    handleSelectGloss,
  };
};
