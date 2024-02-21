import {endOfMonth, format, startOfMonth} from "date-fns";
import {createContext, useState} from "react";
import {FilterType} from "../entities/FilterType";
import {getPeriodRange} from "../utils/getPeriodRange";

interface FiltersContextValue {
  selectedRig: string;
  selectedStartDate: string;
  selectedEndDate: string;
  selectedPeriod: string;
  selectedYear: string;
  handleChangeRig(rigId: string): void;
  handleChangePeriod(period: string): void;
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  handleToggleFilterType(filterType: FilterType): void;
  handleYearChange(year: string): void;
  filters: {
    rigId: string;
    startDate: string;
    endDate: string;
  };
  formattedFirstDay: string;
  formattedLastDay: string;
  selectedFilterType: FilterType;
}

export const FiltersContext = createContext({} as FiltersContextValue);

export const FiltersProvider = ({children}: {children: React.ReactNode}) => {
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
  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>(
    FilterType.CUSTOM
  );
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

  return (
    <FiltersContext.Provider
      value={{
        selectedRig,
        selectedStartDate,
        selectedEndDate,
        selectedPeriod,
        selectedYear,
        filters,
        formattedFirstDay,
        formattedLastDay,
        selectedFilterType,
        handleChangeRig,
        handleChangePeriod,
        handleStartDateChange,
        handleEndDateChange,
        handleToggleFilterType,
        handleYearChange,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
