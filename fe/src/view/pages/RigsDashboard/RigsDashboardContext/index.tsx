import {createContext, useMemo, useState} from "react";
import React from "react";
import {useEfficiencies} from "../../../../app/hooks/useEfficiencies";
import {useAuth} from "../../../../app/hooks/useAuth";
import {User} from "../../../../app/entities/User";
import {startOfMonth, endOfMonth, format} from "date-fns";
import {useRigs} from "../../../../app/hooks/useRigs";
import {Rig} from "../../../../app/entities/Rig";
import {Efficiency} from "../entities/Efficiency";
import {BillingResponse} from "../../../../app/services/billingServices/getAll";
import {formatCurrency} from "../../../../app/utils/formatCurrency";
import {useBillings} from "../../../../app/hooks/useBillings";

interface RigsDashboardValue {
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  selectedEndDate: string;
  selectedStartDate: string;
  handleApplyFilters(): void;
  billings: Array<BillingResponse>;
  isFetchingBillings: boolean;
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
}

export const RigsDashboardContext = createContext({} as RigsDashboardValue);

export const RigsDashboardProvider = ({
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

  const [filters, setFilters] = useState({
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const {billings, isFetchingBillings, refetchBillings} = useBillings(filters);
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

  return (
    <RigsDashboardContext.Provider
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
      }}
    >
      {children}
    </RigsDashboardContext.Provider>
  );
};
