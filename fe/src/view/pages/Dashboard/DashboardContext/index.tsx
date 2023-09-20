import {createContext, useState} from "react";
import React from "react";
import {useEfficiencies} from "../../../../app/hooks/useEfficiencies";
import {useAuth} from "../../../../app/hooks/useAuth";
import {User} from "../../../../app/entities/User";
import {startOfMonth, endOfMonth, format} from "date-fns";
import {useRigs} from "../../../../app/hooks/useRigs";
import {Rig} from "../../../../app/entities/Rig";
import {Efficiency} from "../entities/Efficiency";

interface DashboardContextValue {
  selectedRig: string;
  handleChangeRig(rigId: string): void;
  handleStartDateChange(date: Date): void;
  handleEndDateChange(date: Date): void;
  selectedEndDate: string;
  selectedStartDate: string;
  isFetchingEfficiencies: boolean;
  handleApplyFilters(): void;
  user: User | undefined;
  signout(): void;
  isEmpty: boolean;
  rigs:
    | Rig[]
    | {
        id: string;
        name: string;
        isActive: boolean;
        state: string;
      }[];
  efficiencies: Efficiency[];
  totalAvailableHours: number;
  availableHoursPercentage: number;
  totalUnavailableHours: number;
  unavailableHoursPercentage: number;
  totalDtms: number;
  totalMovimentations: number;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export const DashboardProvider = ({children}: {children: React.ReactNode}) => {
  const {user, signout} = useAuth();

  const isUserAdm = user?.accessLevel === "ADM";

  const {rigs} = useRigs(isUserAdm);

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

  //Mudar as Rigs

  /*   const [selectedStartDate, setSelectedStartDate] = useState(
    new Date().toISOString()
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date().toISOString()
  );
 */

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
    rigId: selectedRig,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });

  const {efficiencies, isFetchingEfficiencies, refetchEffciencies} =
    useEfficiencies(filters);

  const isEmpty: boolean = efficiencies.length === 0;

  const handleApplyFilters = () => {
    refetchEffciencies();
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

  //Lopping para armazenar informações dos stats (colocar em um useMemo)

  let totalAvailableHours: number = 0;
  let totalUnavailableHours: number = 0;
  let totalDtms: number = 0;
  let totalMovimentations: number = 0;

  efficiencies.forEach((efficiency: Efficiency) => {
    totalAvailableHours += efficiency.availableHours;
    totalUnavailableHours += 24 - efficiency.availableHours;

    //Somando as movimentações

    totalMovimentations +=
      efficiency.fluidRatio.length + efficiency.equipmentRatio.length;

    //Somando os periodos
    efficiency.periods.forEach(({type}) => {
      if (type === "DTM") {
        totalDtms++;
      }
    });
  });

  const totalHours: number = totalAvailableHours + totalUnavailableHours;

  let availableHoursPercentage: number = Number(
    ((totalAvailableHours * 100) / totalHours).toFixed()
  );
  let unavailableHoursPercentage: number = Number(
    ((totalUnavailableHours * 100) / totalHours).toFixed()
  );

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
        efficiencies,
        isFetchingEfficiencies,
        user,
        rigs: isUserAdm ? rigs : userRig,
        signout,
        isEmpty,
        totalAvailableHours,
        availableHoursPercentage,
        totalUnavailableHours,
        unavailableHoursPercentage,
        totalDtms,
        totalMovimentations,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
