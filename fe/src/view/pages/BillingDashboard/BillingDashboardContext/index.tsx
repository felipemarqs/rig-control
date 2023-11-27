import {createContext, useCallback, useMemo, useState} from "react";
import React from "react";
import {startOfMonth, endOfMonth, format} from "date-fns";
import {useBillings} from "../../../../app/hooks/useBillings";
import {BillingResponse} from "../../../../app/services/billingServices/getAll";
import {formatCurrency} from "../../../../app/utils/formatCurrency";
import {useConfigBillings} from "../../../../app/hooks/useConfigBillings";
import {BillingConfigResponse} from "../../../../app/services/billingConfigServices/getAll";

interface BillingDashboardContextValue {
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
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
  isEditRigModalOpen: boolean;
  isEditConfigModalOpen: boolean;
  handleCloseEditRigModal(): void;
  handleOpenEditRigModal(data: BillingResponse): void;
  handleCloseEditConfigModal(): void;
  handleOpenEditConfigModal(data: BillingConfigResponse): void;
  rigBeingEdited: BillingResponse | null;
  configBeingEdited: BillingConfigResponse | null;
  configs: Array<BillingConfigResponse>;
}

export const BillingDashboardContext = createContext(
  {} as BillingDashboardContextValue
);

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

  // Defina os estados iniciais
  const [selectedStartDate, setSelectedStartDate] = useState(formattedFirstDay);
  const [selectedEndDate, setSelectedEndDate] = useState(formattedLastDay);
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

  return (
    <BillingDashboardContext.Provider
      value={{
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
      }}
    >
      {children}
    </BillingDashboardContext.Provider>
  );
};
