import React, {createContext, useState} from "react";
import {useEfficiencies} from "../../../../app/hooks/efficiencies/useEfficiencies";
import {useAuth} from "../../../../app/hooks/useAuth";
import {User} from "../../../../app/entities/User";
import {SelectOptions} from "../../../../app/entities/SelectOptions";
import {startOfMonth, endOfMonth, format} from "date-fns";
import {useRigs} from "../../../../app/hooks/rigs/useRigs";
import {Rig} from "../../../../app/entities/Rig";
import {Efficiency} from "../entities/Efficiency";
import {useSidebarContext} from "../../../../app/contexts/SidebarContext";
import {getPeriodRange} from "../../../../app/utils/getPeriodRange";
import {months} from "../../../../app/utils/months";
import {FilterType} from "../../../../app/entities/FilterType";
import {filterOptions} from "../../../../app/utils/filterOptions";
import {years} from "../../../../app/utils/years";
import {EfficienciesResponse} from "../../../../app/services/efficienciesService/getAll";
import {getRepairPeriods} from "../../../../app/utils/getRepairPeriods";
import {Period} from "../../../../app/entities/Period";

// Definição do tipo do contexto
interface DashboardContextValue {
  selectedRig: string;
  selectedPeriod: string;
  handleChangeRig(rigId: string): void;
  handleChangePeriod(period: string): void;
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  handleToggleFilterType(filterType: FilterType): void;
  isAlertSeen: boolean;
  handleIsAlertSeen(): void;
  selectedEndDate: string;
  selectedStartDate: string;
  isFetchingEfficiencies: boolean;
  handleApplyFilters(): void;
  handleYearChange(year: string): void;
  selectedYear: string;
  selectedFilterType: FilterType;
  user: User | undefined;
  signout(): void;
  isEmpty: boolean;
  rigs: Rig[] | {id: string; name: string}[];
  repairPeriods: Period[] | never[];
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
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const formattedFirstDay = format(
    firstDayOfMonth,
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
  );
  const formattedLastDay = format(
    lastDayOfMonth,
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
  );

  const [selectedRig, setSelectedRig] = useState<string>("");
  const [selectedStartDate, setSelectedStartDate] =
    useState<string>(formattedFirstDay);
  const [selectedEndDate, setSelectedEndDate] =
    useState<string>(formattedLastDay);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [selectedYear, setSeletectedYear] = useState<string>("2023");
  const [filters, setFilters] = useState({
    rigId: selectedRig,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  // Utilização dos hooks para eficiências e médias de eficiência
  const {efficiencies, isFetchingEfficiencies, refetchEffciencies} =
    useEfficiencies(filters);

  const isEmpty: boolean = efficiencies.length === 0;
  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>(
    FilterType.PERIOD
  );

  // Funções para manipulação das datas e filtros
  const handleApplyFilters = () => {
    refetchEffciencies();
  };

  const handleChangeRig = (rigId: string) => {
    setSelectedRig(rigId);
    setFilters((prevState) => ({...prevState, rigId: rigId}));
  };

  const handleStartDateChange = (date: Date) => {
    setSelectedStartDate(date.toISOString());
    setFilters((prevState) => ({...prevState, startDate: date.toISOString()}));
  };

  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(date.toISOString());
    setFilters((prevState) => ({...prevState, endDate: date.toISOString()}));
  };

  const handleChangePeriod = (period: string) => {
    setSelectedPeriod(period);
    const periodFound = getPeriodRange(selectedRig, selectedYear);

    if (periodFound) {
      const monthPeriodSelected = periodFound.months.find(
        (month) => month.month === period
      );

      handleStartDateChange(monthPeriodSelected?.startDate!);
      handleEndDateChange(monthPeriodSelected?.endDate!);
    }
  };

  const handleToggleFilterType = (filterType: FilterType) => {
    setSelectedFilterType(filterType);
    handleStartDateChange(new Date(formattedFirstDay));
    handleEndDateChange(new Date(formattedLastDay));
  };

  const handleYearChange = (year: string) => {
    setSeletectedYear(year);
    setSelectedPeriod("");
  };

  const repairPeriods = getRepairPeriods(efficiencies);

  console.log("repairPeriods", repairPeriods);

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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
