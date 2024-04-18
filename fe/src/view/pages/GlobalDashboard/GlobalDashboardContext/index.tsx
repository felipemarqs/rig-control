import React, {createContext, useMemo, useState} from "react";
import {useAuth} from "../../../../app/hooks/useAuth";
import {User} from "../../../../app/entities/User";
import {differenceInDays, parse} from "date-fns";
import {useEfficienciesRigsAverage} from "../../../../app/hooks/efficiencies/useEfficienciesRigsAverage";
import {RigsAverageResponse} from "../../../../app/services/efficienciesService/getRigsAverage";
import {useGetUnbilledPeriods} from "../../../../app/hooks/periods/useGetUnbilledPeriods";
import {GetUnbilledPeriodsResponse} from "../../../../app/services/periodsService/getUnbilledPeriods";
import {PeriodType} from "../../../../app/entities/PeriodType";
import {UF} from "../../../../app/entities/Rig";
import {PieChartData} from "../components/UnbilledPeriodsPieChartCard/UnbilledPeriodsPieChart/useUnbilledPeriodsPieChart";
import {getDiffInMinutes} from "../../../../app/utils/getDiffInMinutes";
import {formatNumberWithFixedDecimals} from "../../../../app/utils/formatNumberWithFixedDecimals";
import {useFiltersContext} from "../../../../app/hooks/useFiltersContext";

// Definição do tipo do contexto
interface GlobalDashboardContextValue {
  selectedPieChartView: PeriodType;
  isEmpty: boolean;
  isAlertSeen: boolean;
  handleSelectedPieChartViewChange(type: PeriodType): void;
  handleIsAlertSeen(): void;
  handleApplyFilters(): void;
  user: User | undefined;
  signout(): void;
  rigsAverage: RigsAverageResponse;
  filteredRigsAverage: RigsAverageResponse;
  isFetchingRigsAverage: boolean;
  totalDaysSelected: number;
  unbilledPeriods: GetUnbilledPeriodsResponse;
  isFetchingUnbilledPeriods: boolean;
  isDetailsGraphVisible: boolean;
  handleCloseDetailsGraph(): void;
  mappedRigsAverage: {
    rig: string;
    daysNotRegistered: number;
    state: UF;
    rigId: string;
  }[];
  isChartDataEmpty: boolean;
  chartData: PieChartData;
  statBox: {
    averageHours: number;
    averageHoursPercentage: number;
  };
  handleChangeDashboardView: (view: DashboardView) => void;
  selectedDashboardView: DashboardView;
}

type DashboardView = "ALL" | "BA" | "SE" | "AL";

// Criação do contexto
export const GlobalDashboardContext = createContext(
  {} as GlobalDashboardContextValue
);

export const GlobalDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Utilização dos hooks para autenticação e contexto da barra lateral
  const {user, signout, isAlertSeen, handleIsAlertSeen} = useAuth();

  // Estados iniciais para as datas (primeiro e último dia do mês atual)
  const {filters} = useFiltersContext();

  const [isDetailsGraphVisible, setIsDetailsGraphVisible] = useState(false);
  const [selectedPieChartView, setSelectedPieChartView] = useState(
    PeriodType.REPAIR
  );

  const handleSelectedPieChartViewChange = (type: PeriodType) => {
    setIsDetailsGraphVisible(true);
    setSelectedPieChartView(type);
  };

  const handleCloseDetailsGraph = () => {
    setIsDetailsGraphVisible(false);
  };

  // Utilização dos hooks para eficiências e médias de eficiência

  const {rigsAverage, refetchRigsAverage, isFetchingRigsAverage} =
    useEfficienciesRigsAverage({
      startDate: filters.startDate,
      endDate: filters.endDate,
    });

  const [selectedDashboardView, setSelectedDashboardView] =
    useState<DashboardView>("ALL");

  const filteredRigsAverage = useMemo(() => {
    if (selectedDashboardView === "ALL") {
      return rigsAverage;
    }

    return rigsAverage.filter(
      ({state}) => (state as string) === selectedDashboardView
    );
  }, [selectedDashboardView, rigsAverage]);

  const handleChangeDashboardView = (view: DashboardView) => {
    setSelectedDashboardView(view);
  };

  let rigsAverageTotalHours = 0;

  filteredRigsAverage.forEach((rigAverage) => {
    rigsAverageTotalHours += Math.round(rigAverage.avg);
  });

  const {unbilledPeriods, refetchUnbilledPeriods, isFetchingUnbilledPeriods} =
    useGetUnbilledPeriods({
      startDate: filters.startDate,
      endDate: filters.endDate,
    });

  const statBox = {
    averageHours:
      formatNumberWithFixedDecimals(
        rigsAverageTotalHours / filteredRigsAverage.length,
        2
      ) ?? 0,
    averageHoursPercentage:
      formatNumberWithFixedDecimals(
        ((rigsAverageTotalHours / filteredRigsAverage.length) * 100) / 24,
        2
      ) ?? 0,
  };

  const isEmpty: boolean = filteredRigsAverage.length === 0;

  const [totalDaysSelected, setTotalDaysSelected] = useState(
    differenceInDays(filters.endDate, filters.startDate) + 1
  );

  const mappedRigsAverage = filteredRigsAverage
    .map(({count, rig, rigId, state}) => {
      return {
        rig,
        daysNotRegistered: totalDaysSelected - count,
        state,
        rigId,
      };
    })
    .sort((a, b) => b.daysNotRegistered - a.daysNotRegistered);

  const chartData: PieChartData = unbilledPeriods.reduce(
    (acc: PieChartData, current) => {
      const parsedStartHour = parse(
        current.startHour.split("T")[1].slice(0, 5),
        "HH:mm",
        new Date()
      );
      const parsedEndHour = parse(
        current.endHour.split("T")[1].slice(0, 5),
        "HH:mm",
        new Date()
      );

      const foundIndex = acc.findIndex((item) => item.id === current.type);

      const diffInMinutes =
        getDiffInMinutes(parsedEndHour, parsedStartHour) / 60;

      if (foundIndex === -1) {
        acc.push({
          id: current.type,
          label: current.type,
          value: formatNumberWithFixedDecimals(diffInMinutes, 2),
          color: current.type === "REPAIR" ? "#1c7b7b" : "#81c460",
        });
      } else {
        acc = acc.map((accItem) =>
          accItem.id === current.type
            ? {
                ...accItem,
                value: formatNumberWithFixedDecimals(
                  (accItem.value += diffInMinutes),
                  2
                ),
              }
            : accItem
        );
      }

      return acc;
    },
    []
  );

  const isChartDataEmpty = chartData.every((data) => data.value === 0);

  // Funções para manipulação das datas e filtros
  const handleApplyFilters = () => {
    setTotalDaysSelected(
      differenceInDays(filters.endDate, filters.startDate) + 1
    );
    refetchRigsAverage();
    refetchUnbilledPeriods();
  };

  // Retorno do provedor do contexto com os valores e funções necessárias
  return (
    <GlobalDashboardContext.Provider
      value={{
        handleChangeDashboardView,
        selectedDashboardView,
        statBox,
        filteredRigsAverage,
        chartData,
        isChartDataEmpty,
        unbilledPeriods,
        mappedRigsAverage,
        selectedPieChartView,
        isFetchingUnbilledPeriods,
        isDetailsGraphVisible,
        handleSelectedPieChartViewChange,
        handleApplyFilters,
        user,
        handleCloseDetailsGraph,
        signout,
        isAlertSeen,
        handleIsAlertSeen,
        totalDaysSelected,
        rigsAverage,
        isFetchingRigsAverage,
        isEmpty,
      }}
    >
      {children}
    </GlobalDashboardContext.Provider>
  );
};
