import {createContext, useMemo, useState} from "react";
import React from "react";
import {startOfMonth, endOfMonth, format} from "date-fns";
import {useBillings} from "../../../../app/hooks/useBillings";
import {BillingResponse} from "../../../../app/services/billingServices/getAll";
import {formatCurrency} from "../../../../app/utils/formatCurrency";

interface BillingDashboardContextValue {
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  selectedEndDate: string;
  selectedStartDate: string;
  handleApplyFilters(): void;
  billings: Array<BillingResponse>;
  isFetchingBillings: boolean;
  isEmpty: boolean;
  totalAmount: number | string;
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

  const [filters, setFilters] = useState({
    startDate: selectedStartDate,
    endDate: selectedEndDate,
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
      }}
    >
      {children}
    </BillingDashboardContext.Provider>
  );
};
