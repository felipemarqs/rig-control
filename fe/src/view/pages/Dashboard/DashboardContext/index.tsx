import {createContext, useState} from "react";
import React from "react";
import {useEfficiencies} from "../../../../app/hooks/efficiencies/useEfficiencies";
import {useAuth} from "../../../../app/hooks/useAuth";
import {User} from "../../../../app/entities/User";
import {SelectOptions} from "../../../../app/entities/SelectOptions";
import {startOfMonth, endOfMonth, format} from "date-fns";
import {useRigs} from "../../../../app/hooks/rigs/useRigs";
import {Rig} from "../../../../app/entities/Rig";
import {Efficiency} from "../entities/Efficiency";
import {useEfficiencyAverage} from "../../../../app/hooks/efficiencies/useEfficiencyAverage";
import {AverageResponse} from "../../../../app/services/efficienciesService/getAverage";
import {useSidebarContext} from "../../../../app/contexts/SidebarContext";
import {getPeriodRange} from "../../../../app/utils/getPeriodRange";
import {months} from "../../../../app/utils/months";
import {FilterType} from "../../../../app/entities/FilterType";

interface DashboardContextValue {
  selectedRig: string;
  selectedPeriod: string;
  handleChangeRig(rigId: string): void;
  handleChangePeriod(period: string): void;
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  handleToggleFilterType(filterType: FilterType): void;
  selectedEndDate: string;
  selectedStartDate: string;
  isFetchingEfficiencies: boolean;
  handleApplyFilters(): void;
  selectedFilterType: FilterType;
  //handleTogglePeriodFilterType(): void;
  user: User | undefined;
  signout(): void;
  isEmpty: boolean;
  // isCustomPeriodActive: boolean;
  rigs:
    | Rig[]
    | {
        id: string;
        name: string;
      }[];
  efficiencies: Efficiency[];
  totalAvailableHours: number;
  availableHoursPercentage: number;
  totalUnavailableHours: number;
  unavailableHoursPercentage: number;
  totalDtms: number;
  totalMovimentations: number;
  isFetchingAverage: boolean;
  average: AverageResponse;
  windowWidth: number;
  filterOptions: SelectOptions;
  months: SelectOptions;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export const DashboardProvider = ({children}: {children: React.ReactNode}) => {
  const {user, signout} = useAuth();

  const {windowWidth} = useSidebarContext();

  const isUserAdm = user?.accessLevel === "ADM";

  const {rigs} = useRigs(isUserAdm);

  const userRigs =
    user?.rigs.map(({rig: {id, name}}) => {
      return {
        id,
        name,
      };
    }) || [];

  const [selectedRig, setSelectedRig] = useState<string>(() => {
    return isUserAdm ? "" : user?.rigs[0].rig.id!;
  });

  //Mudar as Rigs

  /*   const [selectedStartDate, setSelectedStartDate] = useState(
    new Date().toISOString()
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date().toISOString()
  );
 */

  // Obtenha a data atual
  const currentDate = new Date();

  // Obtenha o primeiro dia do mês atual
  const firstDayOfMonth = startOfMonth(currentDate);

  // Obtenha o último dia do mês atual
  const lastDayOfMonth = endOfMonth(currentDate);

  // Formate as datas como strings no formato ISO (ou qualquer formato desejado)
  const formattedFirstDay = format(
    firstDayOfMonth,
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
  );
  const formattedLastDay = format(
    lastDayOfMonth,
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
  );

  // Defina os estados iniciais
  const [selectedStartDate, setSelectedStartDate] = useState(formattedFirstDay);
  const [selectedEndDate, setSelectedEndDate] = useState(formattedLastDay);

  const [selectedPeriod, setSelectedPeriod] = useState("");

  const [filters, setFilters] = useState({
    rigId: selectedRig,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  const {efficiencies, isFetchingEfficiencies, refetchEffciencies} =
    useEfficiencies(filters);

  const {average, refetchAverage, isFetchingAverage} = useEfficiencyAverage(
    filters.rigId
  );

  const isEmpty: boolean = efficiencies.length === 0;

  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>(
    FilterType.PERIOD
  );

  const handleApplyFilters = () => {
    refetchEffciencies();
    refetchAverage();
  };

  const handleChangeRig = (rigId: string) => {
    setSelectedRig(rigId);
    setFilters((prevState) => ({...prevState, rigId: rigId}));
  };

  const handleStartDateChange = (date: Date) => {
    setSelectedStartDate(date.toISOString());
    setFilters((prevState) => ({
      ...prevState,
      startDate: date.toISOString(),
    }));
  };

  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(date.toISOString());
    setFilters((prevState) => ({
      ...prevState,
      endDate: date.toISOString(),
    }));
  };

  const handleChangePeriod = (period: string) => {
    setSelectedPeriod(period);

    const periodFound = getPeriodRange(selectedRig);

    if (periodFound) {
      const monthPeriodSelected = periodFound.months.find((month) => {
        return month.month === period;
      });

      handleStartDateChange(monthPeriodSelected?.startDate!);
      handleEndDateChange(monthPeriodSelected?.endDate!);
    }
  };

  const handleToggleFilterType = (filterType: FilterType) => {
    setSelectedFilterType(filterType);

    handleStartDateChange(new Date(formattedFirstDay));
    handleEndDateChange(new Date(formattedLastDay));
  };

  const filterOptions = [
    {label: "Período de Medição", value: FilterType.PERIOD as string},
    {label: "Período Customizado", value: FilterType.CUSTOM as string},
  ];

  //Lopping para armazenar informações dos stats (colocar em um useMemo)

  let totalAvailableHours: number = 0;
  let totalUnavailableHours: number = 0;
  let totalDtms: number = 0;
  let totalMovimentations: number = 0;

  efficiencies.forEach((efficiency: Efficiency) => {
    totalAvailableHours += efficiency.availableHours;
    totalUnavailableHours += 24 - efficiency.availableHours;

    //Somando as movimentações

    totalMovimentations +=
      efficiency.fluidRatio.length + efficiency.equipmentRatio.length;

    const dtmFound = efficiency.periods.find(({type}) => {
      if (type === "DTM") {
        return type;
      }
    });

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

  return (
    <DashboardContext.Provider
      value={{
        months,
        selectedRig,
        handleChangeRig,
        selectedPeriod,
        handleChangePeriod,
        handleToggleFilterType,
        selectedStartDate,
        selectedEndDate,
        handleStartDateChange,
        handleEndDateChange,
        handleApplyFilters,
        efficiencies,
        isFetchingEfficiencies,
        isFetchingAverage,
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
        average,
        windowWidth,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
