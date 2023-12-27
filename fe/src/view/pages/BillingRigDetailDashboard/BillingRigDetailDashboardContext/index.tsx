import {createContext, useCallback, useMemo, useState} from "react";
import React from "react";
import {startOfMonth, endOfMonth, format} from "date-fns";
import {useBillings} from "../../../../app/hooks/billings/useBillings";
import {BillingResponse} from "../../../../app/services/billingServices/getAll";
import {formatCurrency} from "../../../../app/utils/formatCurrency";
import {useConfigBillings} from "../../../../app/hooks/useConfigBillings";
import {BillingConfigResponse} from "../../../../app/services/billingConfigServices/getAll";
import {useBillingByRigId} from "../../../../app/hooks/billings/useBillingByRigId";
import {Rig} from "../../../../app/entities/Rig";
import {useRigs} from "../../../../app/hooks/rigs/useRigs";
import {filterOptions} from "../../../../app/utils/filterOptions";
import {months} from "../../../../app/utils/months";
import {SelectOptions} from "../../../../app/entities/SelectOptions";
import {FilterType} from "../../../../app/entities/FilterType";
import {getPeriodRange} from "../../../../app/utils/getPeriodRange";
import {useSidebarContext} from "../../../../app/contexts/SidebarContext";

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
  rigs:
    | Rig[]
    | {
        id: string;
        name: string;
      }[];
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
  selectedRig: string;
  isEditRigModalOpen: boolean;
  isEditConfigModalOpen: boolean;
  handleCloseEditRigModal(): void;
  handleOpenEditRigModal(data: BillingResponse): void;
  handleCloseEditConfigModal(): void;
  handleOpenEditConfigModal(data: BillingConfigResponse): void;
  rigBeingEdited: BillingResponse | null;
  configBeingEdited: BillingConfigResponse | null;
  configs: Array<BillingConfigResponse>;
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
  const [isEditRigModalOpen, setIsEditRigModalOpen] = useState(false);
  const [rigBeingEdited, setRigBeingEdited] = useState<null | BillingResponse>(
    null
  );
  const {windowWidth} = useSidebarContext();

  const [selectedPeriod, setSelectedPeriod] = useState("");

  const {rigs} = useRigs(true);

  const [selectedRig, setSelectedRig] = useState<string>("");

  const [isEditConfigModalOpen, setIsEditConfigModalOpen] = useState(false);
  const [configBeingEdited, setConfigBeingEdited] =
    useState<null | BillingConfigResponse>(null);

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [configSliderState, setConfigSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [filters, setFilters] = useState({
    rigId: selectedRig,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>(
    FilterType.PERIOD
  );

  //Edit Rig
  const handleCloseEditRigModal = useCallback(() => {
    setIsEditRigModalOpen(false);
    setRigBeingEdited(null);
  }, []);

  const handleChangeRig = (rigId: string) => {
    setSelectedRig(rigId);
    setFilters((prevState) => ({...prevState, rigId: rigId}));
  };

  const handleOpenEditRigModal = useCallback((data: BillingResponse) => {
    setRigBeingEdited(data);

    setIsEditRigModalOpen(true);
  }, []);
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

  const {billings, isFetchingBillings} = useBillings(filters);

  const {billing, refetchBilling} = useBillingByRigId(filters);

  console.log(`Billing from`, billing);

  console.log(`Filters`, filters);
  const {configs, isFetchingConfig} = useConfigBillings();

  //Temporary Condition
  const isEmpty: boolean = true; /* billings.length === 0 */

  const totalAmount = useMemo(() => {
    let totalBillings = 0;

    billings.forEach(({total}) => {
      totalBillings += total;
    });

    return formatCurrency(totalBillings);
  }, [billings]);

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
        handleToggleFilterType,
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
        handleChangeRig,
        selectedRig,
        rigs,
      }}
    >
      {children}
    </BillingRigDetailDashboardContext.Provider>
  );
};
