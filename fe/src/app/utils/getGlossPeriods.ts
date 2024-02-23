import {Period} from "../entities/Period";
import {PeriodType} from "../entities/PeriodType";
import {EfficienciesResponse} from "../services/efficienciesService/getAll";

export const getGlossPeriods = (
  efficiencies: EfficienciesResponse
): Array<Period> | never[] => {
  const glossPeriods: Array<Period> = [];

  efficiencies.forEach(({periods}) => {
    glossPeriods.push(
      ...periods.filter((period) => period.type === ("GLOSS" as PeriodType))
    );
  });

  return glossPeriods;
};
