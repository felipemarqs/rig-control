import {useState} from "react";
import {useAuth} from "../../../app/hooks/useAuth";
import {useRigs} from "../../../app/hooks/rigs/useRigs";
import {endOfMonth, format, startOfMonth} from "date-fns";
import {useEfficiencies} from "../../../app/hooks/efficiencies/useEfficiencies";
import {FilterType} from "../../../app/entities/FilterType";
import {getPeriodRange} from "../../../app/utils/getPeriodRange";
import {years} from "../../../app/utils/years";

export const useListController = () => {
  const {user, signout} = useAuth();

  const isUserAdm = user?.accessLevel === "ADM";

  const {rigs} = useRigs(isUserAdm);

  const userRig =
    user?.rigs.map(({rig: {id, name}}) => {
      return {
        id,
        name,
      };
    }) || [];

  const [selectedRig, setSelectedRig] = useState<string>(() => {
    return isUserAdm ? "" : user?.rigs[0].rig.id!;
  });

  const [selectedYear, setSeletectedYear] = useState("2023");

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

  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>(
    FilterType.PERIOD
  );

  const [selectedPeriod, setSelectedPeriod] = useState("");

  const [filters, setFilters] = useState({
    rigId: selectedRig,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  const {efficiencies, isFetchingEfficiencies, refetchEffciencies} =
    useEfficiencies(filters);

  const isEmpty: boolean = efficiencies.length === 0;

  const handleApplyFilters = () => {
    refetchEffciencies();
  };

  const handleYearChange = (year: string) => {
    setSeletectedYear(year);
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

    const periodFound = getPeriodRange(selectedRig, selectedYear);

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

  return {
    selectedRig,
    handleChangeRig,
    selectedStartDate,
    selectedEndDate,
    handleStartDateChange,
    handleEndDateChange,
    handleApplyFilters,
    efficiencies,
    isFetchingEfficiencies,
    user,
    rigs: isUserAdm ? rigs : userRig,
    signout,
    isEmpty,
    selectedFilterType,
    filterOptions,
    selectedPeriod,
    handleChangePeriod,
    handleToggleFilterType,
    handleYearChange,
    selectedYear,
    years,
  };
};
