import {useAuth} from "../../../app/hooks/useAuth";
import {useRigs} from "../../../app/hooks/rigs/useRigs";
import {useEfficiencies} from "../../../app/hooks/efficiencies/useEfficiencies";
import {years} from "../../../app/utils/years";
import {useFiltersContext} from "../../../app/hooks/useFiltersContext";
import {filterOptions} from "../../../app/utils/filterOptions";

export const useListController = () => {
  const {user, signout} = useAuth();

  const isUserAdm = user?.accessLevel === "ADM";

  const {rigs} = useRigs(isUserAdm);

  const userRig =
    user?.rigs.map(({rig: {id, name}}) => {
      return {
        id,
        name,
      };
    }) || [];

  const {
    filters,
    selectedEndDate,
    selectedPeriod,
    selectedRig,
    selectedStartDate,
    selectedYear,
    selectedFilterType,
    handleChangePeriod,
    handleChangeRig,
    handleEndDateChange,
    handleStartDateChange,
    handleToggleFilterType,
    handleYearChange,
  } = useFiltersContext();

  const {efficiencies, isFetchingEfficiencies, refetchEffciencies} =
    useEfficiencies(filters);

  const isEmpty: boolean = efficiencies.length === 0;

  const handleApplyFilters = () => {
    refetchEffciencies();
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
    selectedFilterType,
    selectedPeriod,
    filterOptions,
    handleChangePeriod,
    handleToggleFilterType,
    handleYearChange,
    selectedYear,
    years,
  };
};
