import {endOfMonth, format, startOfMonth} from "date-fns";
import {createContext, useState} from "react";
import {FilterType} from "../entities/FilterType";

interface FiltersContextValue {
  setSelectedRig: React.Dispatch<React.SetStateAction<string>>;
  selectedRig: string;
  setSelectedStartDate: React.Dispatch<React.SetStateAction<string>>;
  selectedStartDate: string;
  setSelectedEndDate: React.Dispatch<React.SetStateAction<string>>;
  selectedEndDate: string;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
  selectedPeriod: string;
  setSeletectedYear: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: string;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      rigId: string;
      startDate: string;
      endDate: string;
    }>
  >;
  filters: {
    rigId: string;
    startDate: string;
    endDate: string;
  };
  formattedFirstDay: string;
  formattedLastDay: string;
  selectedFilterType: FilterType;
  setSelectedFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
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
    FilterType.PERIOD
  );
  return (
    <FiltersContext.Provider
      value={{
        setSelectedRig,
        selectedRig,
        selectedStartDate,
        setSelectedStartDate,
        selectedEndDate,
        setSelectedEndDate,
        selectedPeriod,
        setSelectedPeriod,
        setSeletectedYear,
        selectedYear,
        setFilters,
        filters,
        formattedFirstDay,
        formattedLastDay,
        selectedFilterType,
        setSelectedFilterType,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
