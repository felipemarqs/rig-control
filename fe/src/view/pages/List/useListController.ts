import {useState} from "react";
import {useAuth} from "../../../app/hooks/useAuth";
import {useRigs} from "../../../app/hooks/useRigs";
import {endOfMonth, format, startOfMonth} from "date-fns";
import {useEfficiencies} from "../../../app/hooks/useEfficiencies";

export const useListController = () => {
  const {user, signout} = useAuth();

  const isUserAdm = user?.accessLevel === "ADM";

  const {rigs, isFetchingRigs, refetchRigs} = useRigs(isUserAdm);

  const userRig = [{id: user?.rigs[0].rig.id, name: user?.rigs[0].rig.name}];

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

  return {
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
  };
};
