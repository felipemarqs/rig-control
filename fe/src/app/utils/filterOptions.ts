import {FilterType} from "../entities/FilterType";

export const filterOptions = [
  {label: "Período de Medição", value: FilterType.PERIOD as string},
  {label: "Período Customizado", value: FilterType.CUSTOM as string},
];
