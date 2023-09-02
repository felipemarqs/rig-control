import { createContext, useState } from "react";
import React from "react";
import { useEfficiencies } from "../../../../app/hooks/useEfficiencies";
import { useAuth } from "../../../../app/hooks/useAuth";

interface DashboardContextValue {
  selectedRig: string;
  handleChangeRig(rigId: string): void;
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  selectedEndDate: string;
  selectedStartDate: string;
  isFetchingEfficiencies: boolean;
  handleApplyFilters(): void;
  eficiencies: {
    availableHours: number;
    date: string;
    id: string;
    rigId: string;
    userId: string;
  }[];
}

export const DashboardContext = createContext({} as DashboardContextValue);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isUserAdm, user } = useAuth();

  const [selectedRig, setSelectedRig] = useState<string>(() => {
    return isUserAdm ? "" : user?.rigs[0].rig.id!;
  });
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date().toISOString()
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date().toISOString()
  );

  const [filters, setFilters] = useState({
    rigId: selectedRig,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  const { eficiencies, isFetchingEfficiencies, refetchEffciencies } =
    useEfficiencies(filters);

  const handleApplyFilters = () => {
    refetchEffciencies();
  };

  const handleChangeRig = (rigId: string) => {
    setSelectedRig(rigId);
    setFilters((prevState) => ({ ...prevState, rigId: rigId }));
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
    <DashboardContext.Provider
      value={{
        selectedRig,
        handleChangeRig,
        selectedStartDate,
        selectedEndDate,
        handleStartDateChange,
        handleEndDateChange,
        handleApplyFilters,
        eficiencies,
        isFetchingEfficiencies,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
