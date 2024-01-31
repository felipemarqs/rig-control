import {Period} from "../entities/Period";
import {PeriodType} from "../entities/PeriodType";
import {EfficienciesResponse} from "../services/efficienciesService/getAll";

export const getRepairPeriods = (
  efficiencies: EfficienciesResponse
): Array<Period> | never[] => {
  const repairPeriods: Array<Period> = [];

  efficiencies.forEach(({periods}) => {
    repairPeriods.push(
      ...periods.filter((period) => period.type === ("REPAIR" as PeriodType))
    );
  });

  return repairPeriods;
};
