import {EfficienciesResponse} from "../services/efficienciesService/getAll";
export interface totalsInterface {
  availablehouramount: number;
  bobrentamount: number;
  christmastreedisassemblyamount: number;
  demobilizationamount: number;
  dtmbt20and50amount: number;
  dtmgt50amount: number;
  dtmhouramount: number;
  dtmlt20amount: number;
  equipmentbt20and50amount: number;
  equipmentgt50amount: number;
  equipmentlt20amount: number;
  extratraileramount: number;
  fluidbt20and50amount: number;
  fluidgt50amount: number;
  fluidlt20amount: number;
  generatorfuelamount: number;
  glosshouramount: number;
  mixtankdemobilizationamount: number;
  mixtankdtmamount: number;
  mixtankhourrentamount: number;
  mixtankmobilizationamount: number;
  mixtankmonthrentamount: number;
  mixtankoperatoramount: number;
  mobilizationamount: number;
  munckamount: number;
  powerswivelamount: number;
  suckingtruckamount: number;
  transportationamount: number;
  truckcartrentamount: number;
  truckkmamount: number;
  trucktankamount: number;
}
export const getTotals = (efficiencies: EfficienciesResponse) => {
  const totals: totalsInterface = efficiencies.reduce(
    (acc, efficiency) => {
      let hasDtmLt20 = false;
      let hasDtmBt20and50 = false;
      let hasDtmGt50 = false;
      efficiency.periods.forEach(({type, classification}) => {
        if (type === "DTM") {
          if (classification === "LT20") {
            hasDtmLt20 = true;
          }

          if (classification === "BT20AND50") {
            hasDtmBt20and50 = true;
          }

          if (classification === "GT50") {
            hasDtmGt50 = true;
          }
        }
      });

      efficiency.fluidRatio.forEach(({ratio}) => {
        if (ratio === "LT20") {
          acc.fluidlt20amount++;
        }

        if (ratio === "BT20AND50") {
          acc.fluidbt20and50amount++;
        }

        if (ratio === "GT50") {
          acc.fluidgt50amount++;
        }
      });

      efficiency.equipmentRatio.forEach(({ratio}) => {
        if (ratio === "LT20") {
          acc.equipmentlt20amount++;
        }

        if (ratio === "BT20AND50") {
          acc.equipmentbt20and50amount++;
        }

        if (ratio === "GT50") {
          acc.equipmentgt50amount++;
        }
      });

      acc.availablehouramount += efficiency.availableHours;
      acc.bobrentamount += efficiency.bobRentHours;
      acc.christmastreedisassemblyamount +=
        efficiency.christmasTreeDisassemblyHours;
      acc.demobilizationamount += Number(efficiency.hasDemobilization);
      acc.dtmhouramount += efficiency.dtmHours;
      acc.dtmlt20amount += Number(hasDtmLt20);
      acc.dtmbt20and50amount += Number(hasDtmBt20and50);
      acc.dtmgt50amount += Number(hasDtmGt50);
      acc.extratraileramount += Number(efficiency.hasExtraTrailer);
      acc.generatorfuelamount += Number(efficiency.hasGeneratorFuel);
      acc.glosshouramount += 24 - efficiency.availableHours;
      acc.mixtankdemobilizationamount += Number(
        efficiency.hasMixTankDemobilization
      );
      acc.mixtankdtmamount += Number(efficiency.hasMixTankDtm);
      acc.mixtankhourrentamount += Number(efficiency.hasMixTankHourRent);
      acc.mixtankmobilizationamount += Number(
        efficiency.hasMixTankMobilization
      );
      acc.mixtankmonthrentamount += Number(efficiency.hasMixTankMonthRent);
      acc.mixtankoperatoramount += Number(efficiency.hasMixTankOperator);
      acc.mobilizationamount += Number(efficiency.hasMobilization);
      acc.munckamount += Number(efficiency.hasMunck);
      acc.powerswivelamount += Number(efficiency.hasPowerSwivel);
      acc.suckingtruckamount += Number(efficiency.hasSuckingTruck);
      acc.transportationamount += Number(efficiency.hasTransportation);
      (acc.truckcartrentamount += Number(efficiency.hasTruckCartRent)),
        (acc.truckkmamount += efficiency.truckKmHours);
      acc.trucktankamount += Number(efficiency.hasTruckTank);

      return acc;
    },
    {
      availablehouramount: 0,
      bobrentamount: 0,
      christmastreedisassemblyamount: 0,
      demobilizationamount: 0,
      dtmhouramount: 0,
      dtmbt20and50amount: 0,
      dtmgt50amount: 0,
      dtmlt20amount: 0,
      equipmentbt20and50amount: 0,
      equipmentgt50amount: 0,
      equipmentlt20amount: 0,
      extratraileramount: 0,
      fluidbt20and50amount: 0,
      fluidgt50amount: 0,
      fluidlt20amount: 0,
      generatorfuelamount: 0,
      glosshouramount: 0,
      mixtankdemobilizationamount: 0,
      mixtankdtmamount: 0,
      mixtankhourrentamount: 0,
      mixtankmobilizationamount: 0,
      mixtankmonthrentamount: 0,
      mixtankoperatoramount: 0,
      mobilizationamount: 0,
      munckamount: 0,
      powerswivelamount: 0,
      suckingtruckamount: 0,
      transportationamount: 0,
      truckcartrentamount: 0,
      truckkmamount: 0,
      trucktankamount: 0,
    }
  );
  return totals;
};
