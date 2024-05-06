import React, {createContext, useState} from "react";
import {useEfficiencies} from "../../../../app/hooks/efficiencies/useEfficiencies";
import {useAuth} from "../../../../app/hooks/useAuth";
import {User} from "../../../../app/entities/User";
import {Efficiency} from "../entities/Efficiency";
import {EfficienciesResponse} from "../../../../app/services/efficienciesService/getAll";
import {getRepairPeriods} from "../../../../app/utils/getRepairPeriods";
import {Period} from "../../../../app/entities/Period";
import {useEfficienciesRigsAverage} from "../../../../app/hooks/efficiencies/useEfficienciesRigsAverage";
import {RigsAverageResponse} from "../../../../app/services/efficienciesService/getRigsAverage";
import {useFiltersContext} from "../../../../app/hooks/useFiltersContext";
import {getGlossPeriods} from "../../../../app/utils/getGlossPeriods";
import {useWindowWidth} from "@/app/hooks/useWindowWidth";

// Definição do tipo do contexto
interface DashboardContextValue {
  isAlertSeen: boolean;
  handleIsAlertSeen(): void;
  isFetchingEfficiencies: boolean;
  handleApplyFilters(): void;
  user: User | undefined;
  signout(): void;
  isEmpty: boolean;
  repairPeriods: Period[] | never[];
  glossPeriods: Period[] | never[];
  efficiencies: EfficienciesResponse;
  totalAvailableHours: number;
  availableHoursPercentage: number;
  totalUnavailableHours: number;
  unavailableHoursPercentage: number;
  totalDtms: number;
  totalMovimentations: number;
  rigsAverage: RigsAverageResponse;
  selectedGloss: string | null;
  handleSelectGloss: (gloss: string) => void;
  selectedEquipment: string | null;
  isFetchingRigsAverage: boolean;
  handleSelectEquipment: (equipment: string) => void;
  handleRemoveSelectedEquipment: () => void;
  windowWidth: number;
  selectedRig: string;
  exceedsEfficiencyThreshold: boolean;
}

// Criação do contexto
export const DashboardContext = createContext({} as DashboardContextValue);

export const DashboardProvider = ({children}: {children: React.ReactNode}) => {
  // Utilização dos hooks para autenticação e contexto da barra lateral
  const {user, signout, isAlertSeen, handleIsAlertSeen} = useAuth();

  const windowWidth = useWindowWidth();

  const {filters, selectedRig} = useFiltersContext();

  // Utilização dos hooks para eficiências e médias de eficiência
  const {efficiencies, isFetchingEfficiencies, refetchEffciencies} =
    useEfficiencies(filters);

  console.log("Efficiency Length", efficiencies.length);

  const {rigsAverage, refetchRigsAverage, isFetchingRigsAverage} =
    useEfficienciesRigsAverage({
      startDate: filters.startDate,
      endDate: filters.endDate,
    });

  const isEmpty: boolean = efficiencies.length === 0;
  const exceedsEfficiencyThreshold: boolean = efficiencies.length >= 35;

  // Funções para manipulação das datas e filtros
  const handleApplyFilters = () => {
    refetchEffciencies();
    refetchRigsAverage();
  };

  const repairPeriods = getRepairPeriods(efficiencies);

  const glossPeriods = getGlossPeriods(efficiencies);

  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  );

  const [selectedGloss, setSelectedGloss] = useState<string | null>(null);

  const handleSelectGloss = (gloss: string) => {
    setSelectedGloss(gloss);
  };

  const handleSelectEquipment = (equipment: string) => {
    setSelectedEquipment(equipment);
  };

  const handleRemoveSelectedEquipment = () => {
    setSelectedEquipment(null);
  };

  // Cálculos para estatísticas das eficiências
  let totalAvailableHours: number = 0;
  let totalUnavailableHours: number = 0;
  let totalDtms: number = 0;
  let totalMovimentations: number = 0;

  efficiencies.forEach((efficiency: Efficiency) => {
    totalAvailableHours += efficiency.availableHours;
    totalUnavailableHours += 24 - efficiency.availableHours;

    totalMovimentations +=
      efficiency.fluidRatio.length + efficiency.equipmentRatio.length;

    const dtmFound = efficiency.periods.find(({type}) => type === "DTM");
    if (dtmFound) {
      totalDtms++;
    }
  });

  const totalHours: number = totalAvailableHours + totalUnavailableHours;
  let availableHoursPercentage: number = Number(
    ((totalAvailableHours * 100) / totalHours).toFixed(2)
  );
  let unavailableHoursPercentage: number = Number(
    ((totalUnavailableHours * 100) / totalHours).toFixed(2)
  );

  // Retorno do provedor do contexto com os valores e funções necessárias
  return (
    <DashboardContext.Provider
      value={{
        windowWidth,
        handleRemoveSelectedEquipment,
        handleSelectEquipment,
        selectedEquipment,
        glossPeriods,
        repairPeriods,
        handleApplyFilters,
        efficiencies,
        isFetchingEfficiencies,
        user,
        signout,
        isEmpty,
        totalAvailableHours,
        availableHoursPercentage,
        totalUnavailableHours,
        unavailableHoursPercentage,
        totalDtms,
        totalMovimentations,
        isAlertSeen,
        handleIsAlertSeen,
        handleSelectGloss,
        selectedRig,
        selectedGloss,
        rigsAverage,
        isFetchingRigsAverage,
        exceedsEfficiencyThreshold,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
