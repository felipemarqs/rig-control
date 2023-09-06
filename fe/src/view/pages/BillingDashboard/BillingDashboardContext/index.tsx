import {createContext, useState} from "react";
import React from "react";
import {useAuth} from "../../../../app/hooks/useAuth";
import {User} from "../../../../app/entities/User";
import {startOfMonth, endOfMonth, format} from "date-fns";
import {useRigs} from "../../../../app/hooks/useRigs";
import {Rig} from "../../../../app/entities/Rig";
import {useBillings} from "../../../../app/hooks/useBillings";
import {BillingResponse} from "../../../../app/services/billingServices/getAll";

interface BillingDashboardContextValue {
  selectedRig: string;
  handleChangeRig(rigId: string): void;
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  selectedEndDate: string;
  selectedStartDate: string;
  handleApplyFilters(): void;
  user: User | undefined;
  signout(): void;
  rigs:
    | Rig[]
    | {
        id: string;
        name: string;
        isActive: boolean;
        state: string;
      }[];
  billings: Array<BillingResponse>;
  isFetchingBillings: boolean;
  isEmpty: boolean;
}

export const BillingDashboardContext = createContext(
  {} as BillingDashboardContextValue
);

export const BillingDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {user, signout} = useAuth();

  const isUserAdm = user?.accessLevel === "ADM";

  const {rigs, isFetchingRigs, refetchRigs} = useRigs(isUserAdm);

  const userRig = [
    {
      id: user?.rigs[0].rig.id!,
      name: user?.rigs[0].rig.name!,
      isActive: user?.rigs[0].rig.isAtive!,
      state: user?.rigs[0].rig.state!,
    },
  ];

  const [selectedRig, setSelectedRig] = useState<string>(() => {
    return isUserAdm ? "" : user?.rigs[0].rig.id!;
  });

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

  const handleChangeRig = (rigId: string) => {
    setSelectedRig(rigId);
    setFilters((prevState) => ({...prevState, rigId: rigId}));
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
        selectedRig,
        handleChangeRig,
        selectedStartDate,
        selectedEndDate,
        handleStartDateChange,
        handleEndDateChange,
        handleApplyFilters,
        isFetchingBillings,
        user,
        rigs: isUserAdm ? rigs : userRig,
        signout,
        billings,
        isEmpty,
      }}
    >
      {children}
    </BillingDashboardContext.Provider>
  );
};
