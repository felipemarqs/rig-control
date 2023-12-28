import {createContext, useCallback, useState} from "react";
import React from "react";
import {startOfMonth, endOfMonth, format} from "date-fns";
import {useBillings} from "../../../../app/hooks/billings/useBillings";
import {BillingResponse} from "../../../../app/services/billingServices/getAll";
import {useBillingByRigId} from "../../../../app/hooks/billings/useBillingByRigId";
import {Rig} from "../../../../app/entities/Rig";
import {useRigs} from "../../../../app/hooks/rigs/useRigs";
import {filterOptions} from "../../../../app/utils/filterOptions";
import {months} from "../../../../app/utils/months";
import {SelectOptions} from "../../../../app/entities/SelectOptions";
import {FilterType} from "../../../../app/entities/FilterType";
import {getPeriodRange} from "../../../../app/utils/getPeriodRange";
import {useSidebarContext} from "../../../../app/contexts/SidebarContext";
import {BillingByRigIdResponse} from "../../../../app/services/billingServices/getbyRigId";

interface BillingRigDetailDashboardContextValue {
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  selectedEndDate: string;
  handleToggleFilterType(filterType: FilterType): void;
  selectedPeriod: string;
  handleChangePeriod(period: string): void;
  windowWidth: number;
  selectedStartDate: string;
  handleApplyFilters(): void;
  billing: Array<BillingByRigIdResponse>;
  billings: Array<BillingResponse>;
  isFetchingBillings: boolean;
  isEmpty: boolean;
  totalAmount: number;
  rigs:
    | Rig[]
    | {
        id: string;
        name: string;
      }[];
  selectedRig: string;
  handleChangeRig(rigId: string): void;
  filterOptions: SelectOptions;
  months: SelectOptions;
  selectedFilterType: FilterType;
}

export const BillingRigDetailDashboardContext = createContext(
  {} as BillingRigDetailDashboardContextValue
);

export const BillingRigDetailDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  const {windowWidth} = useSidebarContext();

  const [selectedPeriod, setSelectedPeriod] = useState("");

  const {rigs} = useRigs(true);

  const [selectedRig, setSelectedRig] = useState<string>("");

  const [filters, setFilters] = useState({
    rigId: selectedRig,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>(
    FilterType.PERIOD
  );

  const handleChangeRig = (rigId: string) => {
    setSelectedRig(rigId);
    setFilters((prevState) => ({...prevState, rigId: rigId}));
  };

  //=============================

  //Edit Config

  const {billings, isFetchingBillings} = useBillings(filters);

  const {billing, refetchBilling} = useBillingByRigId(filters);

  console.log("billing", billing);

  //Temporary Condition
  const isEmpty: boolean = billing.length === 0;

  const totalAmount: number = isEmpty ? 0 : billing[0].total;

  const handleApplyFilters = () => {
    refetchBilling();
  };

  const handleToggleFilterType = (filterType: FilterType) => {
    setSelectedFilterType(filterType);

    handleStartDateChange(new Date(formattedFirstDay));
    handleEndDateChange(new Date(formattedLastDay));
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

  const handleStartDateChange = useCallback((date: Date) => {
    setSelectedStartDate(date.toISOString());
    setFilters((prevState) => ({
      ...prevState,
      startDate: date.toISOString(),
    }));
  }, []);

  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(date.toISOString());
    setFilters((prevState) => ({
      ...prevState,
      endDate: date.toISOString(),
    }));
  };

  return (
    <BillingRigDetailDashboardContext.Provider
      value={{
        windowWidth,
        handleChangePeriod,
        selectedPeriod,
        selectedFilterType,
        filterOptions,
        months,
        totalAmount,
        handleToggleFilterType,
        selectedStartDate,
        selectedEndDate,
        handleStartDateChange,
        handleEndDateChange,
        handleApplyFilters,
        isFetchingBillings,
        billings,
        billing,
        isEmpty,
        handleChangeRig,
        selectedRig,
        rigs,
      }}
    >
      {children}
    </BillingRigDetailDashboardContext.Provider>
  );
};
