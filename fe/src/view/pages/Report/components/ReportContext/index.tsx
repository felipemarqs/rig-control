import {createContext, useState} from "react";
import {useAuth} from "../../../../../app/hooks/useAuth";
import {useRigs} from "../../../../../app/hooks/rigs/useRigs";
import {Rig} from "../../../../../app/entities/Rig";
import {PeriodType} from "../../../../../app/entities/PeriodType";
import {OrderByType} from "../../../../../app/entities/OrderBy";
import {useGetByPeriodType} from "../../../../../app/hooks/periods/useGetByPeriodType";
import {GetByPeriodIdResponse} from "../../../../../app/services/periodsService/getByPeriodType";
import {endOfMonth, format, startOfMonth} from "date-fns";
import {SelectOptions} from "../../../../../app/entities/SelectOptions";
import {filterOptions} from "../../../../../app/utils/filterOptions";
import {getPeriodRange} from "../../../../../app/utils/getPeriodRange";
import {FilterType} from "../../../../../app/entities/FilterType";
import {months} from "../../../../../app/utils/months";
import {years} from "../../../../../app/utils/years";
import {useSidebarContext} from "../../../../../app/contexts/SidebarContext";
import {periodTypes} from "../../../../../app/utils/periodTypes";
import {Period} from "../../../../../app/entities/Period";

interface ReportContextValues {
  rigs: Rig[] | {id: string; name: string}[];
  periods: Array<Period>;
  selectedYear: string;
  filterOptions: SelectOptions;
  handleChangePeriod(period: string): void;
  handleChangeRig(rigId: string): void;
  selectedFilterType: FilterType;
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  handleYearChange(year: string): void;
  handleToggleFilterType(filterType: FilterType): void;
  handleTogglePeriodType(type: PeriodType): void;
  handleApplyFilters(): void;
  selectedRig: string;
  selectedPeriod: string;
  handleChangeRig(rigId: string): void;
  months: SelectOptions;
  years: SelectOptions;
  periodTypeOptions: SelectOptions;
  selectedEndDate: string;
  selectedStartDate: string;
  windowWidth: number;
  selectedPeriodType: PeriodType;
  isEmpty: boolean;
  isFetchingPeriods: boolean;
}

export const ReportContext = createContext({} as ReportContextValues);

export const ReportProvider = ({children}: {children: React.ReactNode}) => {
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
  const {user, isUserAdm} = useAuth();
  const {windowWidth} = useSidebarContext();

  // Mapeamento das rigs do usuário para exibir apenas as autorizadas
  const userRigs = user?.rigs.map(({rig: {id, name}}) => ({id, name})) || [];
  const {rigs} = useRigs(isUserAdm);

  //estado dos filtros

  const [selectedRig, setSelectedRig] = useState<string>("");
  const [selectedStartDate, setSelectedStartDate] =
    useState<string>(formattedFirstDay);
  const [selectedEndDate, setSelectedEndDate] =
    useState<string>(formattedLastDay);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [selectedPeriodType, setSelectedPeriodType] = useState<PeriodType>(
    PeriodType.WORKING
  );
  const [selectedYear, setSeletectedYear] = useState<string>("2023");

  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>(
    FilterType.PERIOD
  );
  const [filters, setFilters] = useState({
    rigId: "",
    periodType: PeriodType.WORKING,
    orderBy: OrderByType.ASC,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  const {periodsResponse, refetchPeriods, isFetchingPeriods} =
    useGetByPeriodType(filters);

  const isEmpty = periodsResponse.data.length === 0;

  const periodTypeOptions = periodTypes.map(({id, type}) => ({
    label: type,
    value: id,
  }));

  // Funções para manipulação das datas e filtros
  const handleApplyFilters = () => {
    refetchPeriods();
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

  const handleTogglePeriodType = (type: PeriodType) => {
    setSelectedPeriodType(type);
    setFilters((prevState) => ({...prevState, periodType: type}));
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

  return (
    <ReportContext.Provider
      value={{
        rigs,
        periods: periodsResponse.data,
        selectedPeriod,
        selectedYear,
        filterOptions,
        handleChangePeriod,
        selectedFilterType,
        handleToggleFilterType,
        handleYearChange,
        handleChangeRig,
        handleApplyFilters,
        selectedRig,
        months,
        years,
        selectedEndDate,
        selectedStartDate,
        handleStartDateChange,
        handleEndDateChange,
        handleTogglePeriodType,
        windowWidth,
        periodTypeOptions,
        selectedPeriodType,
        isEmpty,
        isFetchingPeriods,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
