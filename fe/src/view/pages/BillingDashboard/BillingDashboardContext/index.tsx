import {createContext, useCallback, useMemo, useState} from "react";
import React from "react";
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
import {months} from "../../../../app/utils/months";
import {years} from "../../../../app/utils/years";
import {useSidebarContext} from "../../../../app/contexts/SidebarContext";
import {useFiltersContext} from "../../../../app/hooks/useFiltersContext";

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

export const BillingDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    filters,
    selectedEndDate,
    selectedPeriod,
    selectedRig,
    selectedStartDate,
    selectedYear,
    handleChangePeriod,
    handleChangeRig,
    handleEndDateChange,
    handleStartDateChange,
    handleToggleFilterType,
    handleYearChange,
    selectedFilterType,
  } = useFiltersContext();
  // Obtenha a data atual
  const {windowWidth} = useSidebarContext();

  const {rigs} = useRigs(true);

  // Defina os estados iniciais

  const [isEditRigModalOpen, setIsEditRigModalOpen] = useState(false);
  const [rigBeingEdited, setRigBeingEdited] = useState<null | BillingResponse>(
    null
  );

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

  //Edit Rig
  const handleCloseEditRigModal = useCallback(() => {
    setIsEditRigModalOpen(false);
    setRigBeingEdited(null);
  }, []);

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
