import React, {createContext} from "react";
import {useEfficiencies} from "../../../../app/hooks/efficiencies/useEfficiencies";
import {useAuth} from "../../../../app/hooks/useAuth";
import {User} from "../../../../app/entities/User";
import {SelectOptions} from "../../../../app/entities/SelectOptions";
import {useRigs} from "../../../../app/hooks/rigs/useRigs";
import {Rig} from "../../../../app/entities/Rig";
import {Efficiency} from "../entities/Efficiency";
import {useSidebarContext} from "../../../../app/contexts/SidebarContext";
import {months} from "../../../../app/utils/months";
import {FilterType} from "../../../../app/entities/FilterType";
import {filterOptions} from "../../../../app/utils/filterOptions";
import {years} from "../../../../app/utils/years";
import {EfficienciesResponse} from "../../../../app/services/efficienciesService/getAll";
import {getRepairPeriods} from "../../../../app/utils/getRepairPeriods";
import {Period} from "../../../../app/entities/Period";
import {useEfficienciesRigsAverage} from "../../../../app/hooks/efficiencies/useEfficienciesRigsAverage";
import {RigsAverageResponse} from "../../../../app/services/efficienciesService/getRigsAverage";
import {useFiltersContext} from "../../../../app/hooks/useFiltersContext";
import {getGlossPeriods} from "../../../../app/utils/getGlossPeriods";

// Definição do tipo do contexto
interface DashboardContextValue {
  selectedRig: string;
  selectedPeriod: string;
  handleChangeRig(rigId: string): void;
  handleChangePeriod(period: string): void;
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  handleToggleFilterType(filterType: FilterType): void;
  handleYearChange(year: string): void;
  isAlertSeen: boolean;
  handleIsAlertSeen(): void;
  selectedEndDate: string;
  selectedStartDate: string;
  isFetchingEfficiencies: boolean;
  handleApplyFilters(): void;
  selectedYear: string;
  selectedFilterType: FilterType;
  user: User | undefined;
  signout(): void;
  isEmpty: boolean;
  rigs: Rig[] | {id: string; name: string}[];
  repairPeriods: Period[] | never[];
  glossPeriods: Period[] | never[];
  efficiencies: EfficienciesResponse;
  totalAvailableHours: number;
  availableHoursPercentage: number;
  totalUnavailableHours: number;
  unavailableHoursPercentage: number;
  totalDtms: number;
  totalMovimentations: number;
  windowWidth: number;
  filterOptions: SelectOptions;
  months: SelectOptions;
  years: SelectOptions;
  rigsAverage: RigsAverageResponse;
  isFetchingRigsAverage: boolean;
}

// Criação do contexto
export const DashboardContext = createContext({} as DashboardContextValue);

export const DashboardProvider = ({children}: {children: React.ReactNode}) => {
  // Utilização dos hooks para autenticação e contexto da barra lateral
  const {user, signout, isAlertSeen, handleIsAlertSeen, isUserAdm} = useAuth();
  const {windowWidth} = useSidebarContext();

  // Verificação se o usuário é administrador para exibir as rigs corretas
  const {rigs} = useRigs(isUserAdm);

  // Mapeamento das rigs do usuário para exibir apenas as autorizadas
  const userRigs = user?.rigs.map(({rig: {id, name}}) => ({id, name})) || [];

  // Estados iniciais para as datas (primeiro e último dia do mês atual)
  const {
    filters,
    selectedEndDate,
    selectedPeriod,
    selectedRig,
    selectedStartDate,
    selectedYear,
    selectedFilterType,
    handleChangePeriod,
    handleChangeRig,
    handleEndDateChange,
    handleStartDateChange,
    handleToggleFilterType,
    handleYearChange,
  } = useFiltersContext();

  // Utilização dos hooks para eficiências e médias de eficiência
  const {efficiencies, isFetchingEfficiencies, refetchEffciencies} =
    useEfficiencies(filters);

  const {rigsAverage, refetchRigsAverage, isFetchingRigsAverage} =
    useEfficienciesRigsAverage({
      startDate: filters.startDate,
      endDate: filters.endDate,
    });

  const isEmpty: boolean = efficiencies.length === 0;

  // Funções para manipulação das datas e filtros
  const handleApplyFilters = () => {
    refetchEffciencies();
    refetchRigsAverage();
  };

  const repairPeriods = getRepairPeriods(efficiencies);

  console.log("repairPeriods", repairPeriods);

  const glossPeriods = getGlossPeriods(efficiencies);

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
        years,
        months,
        glossPeriods,
        selectedRig,
        handleChangeRig,
        selectedPeriod,
        handleChangePeriod,
        handleToggleFilterType,
        selectedStartDate,
        selectedEndDate,
        repairPeriods,
        handleStartDateChange,
        handleEndDateChange,
        handleApplyFilters,
        efficiencies,
        isFetchingEfficiencies,
        user,
        filterOptions,
        selectedFilterType,
        rigs: isUserAdm ? rigs : userRigs,
        signout,
        isEmpty,
        totalAvailableHours,
        availableHoursPercentage,
        totalUnavailableHours,
        unavailableHoursPercentage,
        totalDtms,
        totalMovimentations,
        windowWidth,
        isAlertSeen,
        handleIsAlertSeen,
        handleYearChange,
        selectedYear,
        rigsAverage,
        isFetchingRigsAverage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
