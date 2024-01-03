import {createContext, useCallback, useMemo, useState} from "react";
import React from "react";
import {startOfMonth, endOfMonth, format} from "date-fns";
import {useBillings} from "../../../../app/hooks/billings/useBillings";
import {BillingResponse} from "../../../../app/services/billingServices/getAll";
import {formatCurrency} from "../../../../app/utils/formatCurrency";
import {useConfigBillings} from "../../../../app/hooks/useConfigBillings";
import {BillingConfigResponse} from "../../../../app/services/billingConfigServices/getAll";
import {FilterType} from "../../../../app/entities/FilterType";
import {filterOptions} from "../../../../app/utils/filterOptions";
import {SelectOptions} from "../../../../app/entities/SelectOptions";
import {useRigs} from "../../../../app/hooks/rigs/useRigs";
import {Rig} from "../../../../app/entities/Rig";
import {getPeriodRange} from "../../../../app/utils/getPeriodRange";
import {months} from "../../../../app/utils/months";
import {years} from "../../../../app/utils/years";
import {useSidebarContext} from "../../../../app/contexts/SidebarContext";

interface BillingDashboardContextValue {
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  handleYearChange(year: string): void;
  selectedEndDate: string;
  selectedStartDate: string;
  handleApplyFilters(): void;
  billings: Array<BillingResponse>;
  isFetchingBillings: boolean;
  isFetchingConfig: boolean;
  isEmpty: boolean;
  totalAmount: number | string;
  setSliderState({
    isBeginning,
    isEnd,
  }: {
    isBeginning: boolean;
    isEnd: boolean;
  }): void;
  sliderState: {
    isBeginning: boolean;
    isEnd: boolean;
  };
  setConfigSliderState({
    isBeginning,
    isEnd,
  }: {
    isBeginning: boolean;
    isEnd: boolean;
  }): void;
  configSliderState: {
    isBeginning: boolean;
    isEnd: boolean;
  };
  rigs:
    | Rig[]
    | {
        id: string;
        name: string;
      }[];
  isEditRigModalOpen: boolean;
  isEditConfigModalOpen: boolean;
  handleCloseEditRigModal(): void;
  handleOpenEditRigModal(data: BillingResponse): void;
  handleCloseEditConfigModal(): void;
  handleChangePeriod(period: string): void;
  selectedPeriod: string;
  handleOpenEditConfigModal(data: BillingConfigResponse): void;
  rigBeingEdited: BillingResponse | null;
  configBeingEdited: BillingConfigResponse | null;
  configs: Array<BillingConfigResponse>;
  selectedRig: string;
  selectedFilterType: FilterType;
  filterOptions: SelectOptions;
  handleChangeRig(rigId: string): void;
  months: SelectOptions;
  years: SelectOptions;
  selectedYear: string;
  windowWidth: number;

  handleToggleFilterType(filterType: FilterType): void;
}

export const BillingDashboardContext = createContext(
  {} as BillingDashboardContextValue
);

/* ,
,
,
,
,

months,
selectedYear,
handleYearChange,
years */

export const BillingDashboardProvider = ({
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

  const {windowWidth} = useSidebarContext();

  const {rigs} = useRigs(true);

  // Defina os estados iniciais
  const [selectedStartDate, setSelectedStartDate] = useState(formattedFirstDay);
  const [selectedEndDate, setSelectedEndDate] = useState(formattedLastDay);
  const [isEditRigModalOpen, setIsEditRigModalOpen] = useState(false);
  const [rigBeingEdited, setRigBeingEdited] = useState<null | BillingResponse>(
    null
  );
  const [selectedRig, setSelectedRig] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedYear, setSeletectedYear] = useState("2023");

  const [isEditConfigModalOpen, setIsEditConfigModalOpen] = useState(false);
  const [configBeingEdited, setConfigBeingEdited] =
    useState<null | BillingConfigResponse>(null);

  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>(
    FilterType.CUSTOM
  );

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [configSliderState, setConfigSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [filters, setFilters] = useState({
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  //Edit Rig
  const handleCloseEditRigModal = useCallback(() => {
    setIsEditRigModalOpen(false);
    setRigBeingEdited(null);
  }, []);

  const handleOpenEditRigModal = useCallback((data: BillingResponse) => {
    setRigBeingEdited(data);

    setIsEditRigModalOpen(true);
  }, []);

  const handleToggleFilterType = (filterType: FilterType) => {
    setSelectedFilterType(filterType);

    handleStartDateChange(new Date(formattedFirstDay));
    handleEndDateChange(new Date(formattedLastDay));
  };

  const handleChangeRig = (rigId: string) => {
    setSelectedRig(rigId);
    setFilters((prevState) => ({...prevState, rigId: rigId}));
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
  //=============================

  //Edit Config

  const handleCloseEditConfigModal = useCallback(() => {
    setConfigBeingEdited(null);

    setIsEditConfigModalOpen(false);
  }, []);
  const handleOpenEditConfigModal = useCallback(
    (data: BillingConfigResponse) => {
      setConfigBeingEdited(data);
      setIsEditConfigModalOpen(true);
    },
    []
  );

  const {billings, isFetchingBillings, refetchBillings} = useBillings(filters);

  const {configs, isFetchingConfig} = useConfigBillings();

  const isEmpty: boolean = billings.length === 0;

  const totalAmount = useMemo(() => {
    let totalBillings = 0;

    billings.forEach(({total}) => {
      totalBillings += total;
    });

    return formatCurrency(totalBillings);
  }, [billings]);

  const handleApplyFilters = () => {
    refetchBillings();
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

  const handleYearChange = (year: string) => {
    setSeletectedYear(year);
    setSelectedPeriod("");
  };

  return (
    <BillingDashboardContext.Provider
      value={{
        years,
        windowWidth,
        selectedYear,

        handleYearChange,
        months,
        handleChangeRig,
        selectedRig,
        handleToggleFilterType,
        selectedFilterType,
        handleChangePeriod,
        selectedPeriod,
        filterOptions,
        selectedStartDate,
        selectedEndDate,
        handleStartDateChange,
        handleEndDateChange,
        handleApplyFilters,
        isFetchingBillings,
        billings,
        isEmpty,
        totalAmount,
        setSliderState,
        sliderState,
        isEditRigModalOpen,
        handleCloseEditRigModal,
        handleOpenEditRigModal,
        rigBeingEdited,
        isFetchingConfig,
        configSliderState,
        setConfigSliderState,
        isEditConfigModalOpen,
        handleCloseEditConfigModal,
        handleOpenEditConfigModal,
        configs,
        configBeingEdited,
        rigs,
      }}
    >
      {children}
    </BillingDashboardContext.Provider>
  );
};
