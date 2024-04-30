import {createContext, useCallback, useEffect, useState} from "react";
import {useAuth} from "../../../../../app/hooks/useAuth";
import {useRigs} from "../../../../../app/hooks/rigs/useRigs";
import {Rig} from "../../../../../app/entities/Rig";
import {PeriodType} from "../../../../../app/entities/PeriodType";
import {OrderByType} from "../../../../../app/entities/OrderBy";
import {useGetByPeriodType} from "../../../../../app/hooks/periods/useGetByPeriodType";
import {GetByPeriodTypeFilters} from "../../../../../app/services/periodsService/getByPeriodType";
import {endOfMonth, format, startOfMonth} from "date-fns";
import {SelectOptions} from "../../../../../app/entities/SelectOptions";
import {filterOptions} from "../../../../../app/utils/filterOptions";
import {getPeriodRange} from "../../../../../app/utils/getPeriodRange";
import {FilterType} from "../../../../../app/entities/FilterType";
import {months} from "../../../../../app/utils/months";
import {years} from "../../../../../app/utils/years";
import {periodTypes} from "../../../../../app/utils/periodTypes";
import {Period} from "../../../../../app/entities/Period";
import {PeriodClassification} from "../../../../../app/entities/PeriodClassification";
import {RepairClassification} from "../../../../../app/entities/RepairClassification";
import {periodClassifications} from "../../../../../app/utils/periodClassifications";
import {GridPaginationModel} from "@mui/x-data-grid";

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
  toggleFilterContainerVisibility(): void;
  handleClearFilters(): void;
  handleClearSelectedPeriodClassification(): void;
  handleClearSelectedRepairClassification(): void;
  handleChangePageSize(pageSize: number | string): void;
  handleChangePageIndex(pageIndex: number | string): void;
  handlePeriodClassification(classification: PeriodClassification): void;
  handleRepairClassification(repairClassification: RepairClassification): void;
  onPaginationModelChange(model: GridPaginationModel): void;

  selectedRig: string;
  selectedPeriod: string;
  handleChangeRig(rigId: string): void;
  months: SelectOptions;
  years: SelectOptions;
  periodTypeOptions: SelectOptions;
  periodClassificationOptions: SelectOptions | null;
  repairClassificationOptions: SelectOptions | null;
  emptyOptions: SelectOptions;
  selectedPeriodClassification: string;
  selectedEndDate: string;
  selectedStartDate: string;
  isFilterContainerVisible: boolean;
  selectedPeriodType: PeriodType;
  isEmpty: boolean;
  isFetchingPeriods: boolean;
  filters: GetByPeriodTypeFilters;
  totalItems: number;
  isFiltersValid: boolean;
}

export const ReportContext = createContext({} as ReportContextValues);

export const ReportProvider = ({children}: {children: React.ReactNode}) => {
  const currentDate = new Date();
  const {user} = useAuth();

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
  const {isUserAdm} = useAuth();

  // Mapeamento das rigs do usuário para exibir apenas as autorizadas
  const {rigs} = useRigs(isUserAdm);

  const userRigs = user?.rigs.map(({rig: {id, name}}) => ({id, name})) || [];

  const emptyOptions = [{value: "", label: ""}];

  //estado dos filtros
  const [isFilterContainerVisible, setIsFilterContainerVisible] =
    useState(true);
  const [selectedRig, setSelectedRig] = useState<string>("");
  const [selectedStartDate, setSelectedStartDate] =
    useState<string>(formattedFirstDay);
  const [selectedEndDate, setSelectedEndDate] =
    useState<string>(formattedLastDay);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [selectedPeriodType, setSelectedPeriodType] = useState<PeriodType>(
    PeriodType.WORKING
  );
  const [selectedPeriodClassification, setSelectedPeriodClassification] =
    useState<PeriodClassification | string>(PeriodClassification.WORKING);
  const [periodClassificationOptions, setPeriodClassificationOptions] =
    useState<null | SelectOptions>([
      {
        label: "Operando",
        value: PeriodClassification.WORKING,
      },
    ]);

  const [repairClassificationOptions, setRepairClassificationOptions] =
    useState<null | SelectOptions>(null);
  const [selectedYear, setSeletectedYear] = useState<string>("2023");

  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>(
    FilterType.PERIOD
  );
  const [filters, setFilters] = useState<GetByPeriodTypeFilters>({
    rigId: "",
    periodType: PeriodType.WORKING,
    periodClassification: "WORKING",
    repairClassification: null,
    orderBy: OrderByType.ASC,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
    pageSize: "50",
    pageIndex: "1",
  });

  const {periodsResponse, refetchPeriods, isFetchingPeriods} =
    useGetByPeriodType(filters);

  const isEmpty = periodsResponse.data.length === 0;

  const periodTypeOptions = periodTypes.map(({id, type}) => ({
    label: type,
    value: id,
  }));

  const toggleFilterContainerVisibility = () => {
    setIsFilterContainerVisible((prevState) => !prevState);
  };

  const getPeriodClassificationsByType = (type: PeriodType) => {
    return periodClassifications[type].map(({id, classification}) => ({
      value: id,
      label: classification,
    }));
  };

  const getRepairClassification = (repairType: string) => {
    return periodClassifications.REPAIR.find(({id}) => id === repairType)
      ?.repairClassification;
  };
  /* 
  const periodClassificationOptions = allClassifications.map(
    ({id, classification}) => ({
      value: id,
      label: classification,
    })
  ); */

  // Funções para manipulação das datas e filtros
  const handleApplyFilters = () => {
    refetchPeriods();
  };

  const handleClearFilters = () => {
    setSelectedPeriodClassification("");
    setSelectedRig("");
    setSelectedPeriod("");

    setFilters({
      rigId: "",
      periodType: PeriodType.WORKING,
      periodClassification: PeriodClassification.WORKING,
      repairClassification: null,
      orderBy: OrderByType.ASC,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      pageSize: "50",
      pageIndex: "1",
    });
  };

  const handleClearSelectedPeriodClassification = () => {
    setFilters((prev) => ({...prev, periodClassification: "", pageIndex: "1"}));
    setSelectedPeriodClassification("");
  };

  const handleClearSelectedRepairClassification = () => {
    setFilters((prev) => ({
      ...prev,
      repairClassification: null,
      pageIndex: "1",
    }));
  };

  const handleChangeRig = (rigId: string) => {
    setSelectedRig(rigId);
    setFilters((prevState) => ({...prevState, rigId: rigId, pageIndex: "1"}));
  };

  const handleStartDateChange = (date: Date) => {
    setSelectedStartDate(date.toISOString());
    setFilters((prevState) => ({
      ...prevState,
      startDate: date.toISOString(),
      pageIndex: "1",
    }));
  };

  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(date.toISOString());
    setFilters((prevState) => ({
      ...prevState,
      endDate: date.toISOString(),
      pageIndex: "1",
    }));
  };

  const handleTogglePeriodType = (type: PeriodType) => {
    const periodClassificationOptions = getPeriodClassificationsByType(type);
    setPeriodClassificationOptions(
      periodClassificationOptions ? periodClassificationOptions : null
    );
    setSelectedPeriodClassification("");
    setSelectedPeriodType(type);
    setFilters((prevState) => ({
      ...prevState,
      pageIndex: "1",
      periodType: type,
      periodClassification: "",
      repairClassification: null,
    }));
  };

  const [onPaginationModelChangeListener, setOnPaginationModelChangeListener] =
    useState(false);
  const onPaginationModelChange = useCallback((model: GridPaginationModel) => {
    setOnPaginationModelChangeListener((prev) => !prev);
    setFilters((prevState) => ({
      ...prevState,
      pageIndex: (model.page + 1).toString(),
      pageSize: model.pageSize.toString(),
    }));
  }, []);

  useEffect(() => {
    refetchPeriods();
  }, [onPaginationModelChangeListener]);

  const handlePeriodClassification = (classification: PeriodClassification) => {
    setSelectedPeriodClassification(classification);
    const repairClassificationOptions = getRepairClassification(classification);
    setFilters((prevState) => ({
      ...prevState,
      repairClassification: null,
      periodClassification: classification,
      pageIndex: "1",
    }));
    setRepairClassificationOptions(repairClassificationOptions ?? null);
  };
  const isFiltersValid = Boolean(
    filters.startDate &&
      filters.endDate &&
      filters.orderBy &&
      filters.pageIndex &&
      filters.pageSize &&
      filters.periodType &&
      filters.rigId
  );

  const handleRepairClassification = (
    repairClassification: RepairClassification
  ) => {
    setFilters((prevState) => ({
      ...prevState,
      repairClassification: repairClassification,
      pageIndex: "1",
    }));
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

  const handleChangePageSize = (pageSize: number | string) => {
    setFilters((prevState) => ({...prevState, pageSize: pageSize.toString()}));
  };

  const handleChangePageIndex = (pageIndex: number | string) => {
    setFilters((prevState) => ({
      ...prevState,
      pageIndex: pageIndex.toString(),
    }));
  };

  return (
    <ReportContext.Provider
      value={{
        isFiltersValid,
        emptyOptions,
        rigs: isUserAdm ? rigs : userRigs,
        filters,
        selectedPeriodClassification,
        periodClassificationOptions,
        periods: periodsResponse.data,
        totalItems: periodsResponse.totalItems,
        selectedPeriod,
        selectedYear,
        filterOptions,
        selectedFilterType,
        repairClassificationOptions,
        isFilterContainerVisible,
        handleClearSelectedPeriodClassification,
        handleClearSelectedRepairClassification,
        handleClearFilters,
        handleToggleFilterType,
        handleChangePeriod,
        handlePeriodClassification,
        handleRepairClassification,
        handleYearChange,
        handleChangeRig,
        handleApplyFilters,
        handleChangePageSize,
        handleChangePageIndex,
        toggleFilterContainerVisibility,
        onPaginationModelChange,
        selectedRig,
        months,
        years,
        selectedEndDate,
        selectedStartDate,
        handleStartDateChange,
        handleEndDateChange,
        handleTogglePeriodType,
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
