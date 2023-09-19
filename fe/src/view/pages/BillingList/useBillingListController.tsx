import {useState} from "react";

import {endOfMonth, format, startOfMonth} from "date-fns";

import {useBillings} from "../../../app/hooks/useBillings";

export const useBillingListController = () => {
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

  return {
    selectedStartDate,
    selectedEndDate,
    handleStartDateChange,
    handleEndDateChange,
    handleApplyFilters,
    isEmpty,
    billings,
    isFetchingBillings,
  };
};
