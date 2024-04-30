import {createContext, useCallback, useEffect, useMemo, useState} from "react";
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
import {useFiltersContext} from "../../../../app/hooks/useFiltersContext";
import {formatCurrencyStringToNegativeNumber} from "@/app/utils/formatCurrencyStringToNegativeNumber";

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
  totalGlossAmount: number | string;
  totalRepairAmount: number | string;
  totalUnbilledAmount: number | string;
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

  const {rigs} = useRigs(true);

  // Defina os estados iniciais

  const [isEditRigModalOpen, setIsEditRigModalOpen] = useState(false);
  const [rigBeingEdited, setRigBeingEdited] = useState<null | BillingResponse>(
    null
  );

  useEffect(() => {
    handleToggleFilterType(FilterType.CUSTOM);
  }, []);

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

  /*  const filteredRigsAverage = useMemo(() => {
    if (selectedDashboardView === "ALL") {
      return billings;
    }

    return billings.filter(
      ({state}) => (state as string) === selectedDashboardView
    );
  }, [selectedDashboardView, billings]);
 */
  const {
    totalAmount,
    totalGlossAmount,
    totalRepairAmount,
    totalUnbilledAmount,
  } = useMemo(() => {
    let totalBillings = 0;
    let totalRepairUnbilled = 0;
    let totalGlossUnbilled = 0;

    billings.forEach(({total, repairhouramount, glosshouramount}) => {
      totalBillings += total;
      totalGlossUnbilled += glosshouramount;

      if (repairhouramount) {
        totalRepairUnbilled += repairhouramount;
      }
    });

    const totalAmount = formatCurrency(totalBillings);

    const totalRepairAmount = formatCurrencyStringToNegativeNumber(
      formatCurrency(totalRepairUnbilled)
    );
    const totalGlossAmount = formatCurrencyStringToNegativeNumber(
      formatCurrency(totalGlossUnbilled)
    );
    const totalUnbilledAmount = formatCurrency(
      totalRepairUnbilled + totalGlossUnbilled
    );

    return {
      totalAmount,
      totalRepairAmount,
      totalGlossAmount,
      totalUnbilledAmount,
    };
  }, [billings]);

  const handleApplyFilters = () => {
    refetchBillings();
  };

  return (
    <BillingDashboardContext.Provider
      value={{
        years,
        totalUnbilledAmount,
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
        totalGlossAmount,
        totalRepairAmount,
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
