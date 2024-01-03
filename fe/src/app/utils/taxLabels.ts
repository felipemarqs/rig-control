export const taxNames = [
  "availablehouramount",
  "bobrentamount",
  "christmastreedisassemblyamount",
  "demobilizationamount",
  "dtmhouramount",
  "dtmbt20and50amount",
  "dtmgt50amount",
  "dtmlt20amount",
  "equipmentbt20and50amount",
  "equipmentgt50amount",
  "equipmentlt20amount",
  "extratraileramount",
  "fluidbt20and50amount",
  "fluidgt50amount",
  "fluidlt20amount",
  "generatorfuelamount",
  "glosshouramount",
  "mixtankdemobilizationamount",
  "mixtankdtmamount",
  "mixtankhourrentamount",
  "mixtankmobilizationamount",
  "mixtankmonthrentamount",
  "mixtankoperatoramount",
  "mobilizationamount",
  "munckamount",
  "powerswivelamount",
  "suckingtruckamount",
  "transportationamount",
  "truckcartrentamount",
  "truckkmamount",
  "trucktankamount",
];

export const taxTranslation: Record<string, string> = {
  availablehouramount: "Horas Disponíveis",
  glosshouramount: "Horas Glosa",
  dtmhouramount: "Horas DTM",
  dtmlt20amount: "DTM < 20",
  dtmbt20and50amount: "DTM 20-50",
  dtmgt50amount: "DTM > 50",
  fluidlt20amount: "Taxa de Fluido < 20",
  fluidbt20and50amount: "Taxa de Fluido 20-50",
  fluidgt50amount: "Taxa de Fluido > 50",
  equipmentlt20amount: "Taxa de Equipamento < 20",
  equipmentbt20and50amount: "Taxa de Equipamento 20-50",
  equipmentgt50amount: "Taxa de Equipamento > 50",
  bobrentamount: "Locação BOP", //
  christmastreedisassemblyamount: "Desmontagem de Árvode de Natal",
  demobilizationamount: "Desmobilização",
  extratraileramount: "Trailer Extra",
  generatorfuelamount: "Combustível Gerador",
  mixtankdemobilizationamount: "Desm. de Tanque Mix",
  mixtankdtmamount: "DTM Tanque Mix ",
  mixtankhourrentamount: "Loc. Tanque Mix em serviço",
  mixtankmobilizationamount: "Mob. de Tanque Mix",
  mixtankmonthrentamount: "Loc Tanque Mix Mensal",
  mixtankoperatoramount: "Operadores de Tanque Mix",
  mobilizationamount: "Mobilização",
  munckamount: "Loc. Munk",
  powerswivelamount: "Power Swivel",
  suckingtruckamount: "Caminhão Sugador",
  transportationamount: "Transporte",
  truckcartrentamount: "Locação Caminhão + Carreta",
  truckkmamount: "Km Caminhão",
  trucktankamount: "Locação Caminhão + Tanque",
};

export const taxSuffix: Record<string, string> = {
  availablehouramount: "Hrs",
  glosshouramount: "Hrs",
  dtmhouramount: "Hrs",
  bobrentamount: "Hrs",
  christmastreedisassemblyamount: "Hrs",
};
