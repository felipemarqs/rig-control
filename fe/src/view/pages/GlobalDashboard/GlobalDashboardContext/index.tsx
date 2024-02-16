import React, {createContext, useState} from "react";
import {useAuth} from "../../../../app/hooks/useAuth";
import {User} from "../../../../app/entities/User";
import {SelectOptions} from "../../../../app/entities/SelectOptions";
import {startOfMonth, endOfMonth, format, differenceInDays} from "date-fns";
import {useRigs} from "../../../../app/hooks/rigs/useRigs";
import {Rig} from "../../../../app/entities/Rig";
import {useSidebarContext} from "../../../../app/contexts/SidebarContext";
import {months} from "../../../../app/utils/months";
import {filterOptions} from "../../../../app/utils/filterOptions";
import {years} from "../../../../app/utils/years";
import {useEfficienciesRigsAverage} from "../../../../app/hooks/efficiencies/useEfficienciesRigsAverage";
import {RigsAverageResponse} from "../../../../app/services/efficienciesService/getRigsAverage";

// Definição do tipo do contexto
interface GlobalDashboardContextValue {
  selectedPeriod: string;
  isEmpty: boolean;
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  isAlertSeen: boolean;
  handleIsAlertSeen(): void;
  selectedEndDate: string;
  selectedStartDate: string;
  handleApplyFilters(): void;
  handleYearChange(year: string): void;
  selectedYear: string;
  user: User | undefined;
  signout(): void;
  rigs: Rig[] | {id: string; name: string}[];
  windowWidth: number;
  filterOptions: SelectOptions;
  months: SelectOptions;
  years: SelectOptions;
  rigsAverage: RigsAverageResponse;
  isFetchingRigsAverage: boolean;
  totalDaysSelected: number;
}

// Criação do contexto
export const GlobalDashboardContext = createContext(
  {} as GlobalDashboardContextValue
);

export const GlobalDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  const [selectedStartDate, setSelectedStartDate] =
    useState<string>(formattedFirstDay);
  const [selectedEndDate, setSelectedEndDate] =
    useState<string>(formattedLastDay);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [selectedYear, setSeletectedYear] = useState<string>("2023");
  const [filters, setFilters] = useState({
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  // Utilização dos hooks para eficiências e médias de eficiência

  const {rigsAverage, refetchRigsAverage, isFetchingRigsAverage} =
    useEfficienciesRigsAverage(
      {
        startDate: filters.startDate,
        endDate: filters.endDate,
      },
      isUserAdm
    );

  const isEmpty: boolean = rigsAverage.length === 0;

  console.log("rigsAverage", rigsAverage);

  const totalDaysSelected =
    differenceInDays(filters.endDate, filters.startDate) + 1;

  // Funções para manipulação das datas e filtros
  const handleApplyFilters = () => {
    refetchRigsAverage();
  };

  const handleStartDateChange = (date: Date) => {
    setSelectedStartDate(date.toISOString());
    setFilters((prevState) => ({...prevState, startDate: date.toISOString()}));
  };

  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(date.toISOString());
    setFilters((prevState) => ({...prevState, endDate: date.toISOString()}));
  };

  const handleYearChange = (year: string) => {
    setSeletectedYear(year);
    setSelectedPeriod("");
  };

  // Retorno do provedor do contexto com os valores e funções necessárias
  return (
    <GlobalDashboardContext.Provider
      value={{
        years,
        months,
        selectedPeriod,
        selectedStartDate,
        selectedEndDate,
        handleStartDateChange,
        handleEndDateChange,
        handleApplyFilters,
        user,
        filterOptions,
        rigs: isUserAdm ? rigs : userRigs,
        signout,
        windowWidth,
        isAlertSeen,
        handleIsAlertSeen,
        totalDaysSelected,
        handleYearChange,
        selectedYear,
        rigsAverage,
        isFetchingRigsAverage,
        isEmpty,
      }}
    >
      {children}
    </GlobalDashboardContext.Provider>
  );
};
