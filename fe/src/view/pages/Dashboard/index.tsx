// Importações de componentes e contextos necessários
import {
  BaggageClaim,
  FilterIcon,
  PieChart,
  TimerIcon,
  TimerOff,
  Truck,
  X,
} from "lucide-react";
//import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {NotFound} from "../../components/NotFound";
import {Select} from "../../components/Select";
import {Spinner} from "../../components/Spinner";
import {DashboardContext, DashboardProvider} from "./DashboardContext";
import {LineChart} from "./components/LineChart";
import {ListEfficienciesDataGrid} from "../../components/ListEfficienciesDataGrid";
import {cn} from "../../../app/utils/cn";
import {FilterType} from "../../../app/entities/FilterType";
import {AccessLevel} from "../../../app/entities/AccessLevel";
import {AverageBarChart} from "./components/AverageBarChart";
import {RepairDetailsPieChart} from "./components/RepairDetailsPieChart";
import {Link} from "react-router-dom";
import {ArrowUpRight} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

import {Progress} from "@/components/ui/progress";
import {GrouppedRepairsCard} from "./components/GrouppedRepairsCard";
import {translateClassification} from "@/app/utils/translateClassification";
import {GrouppedGlossesCard} from "./components/GrouppedGlossesCard";
import {StatboxContainer} from "./components/StatboxContainer";
import {LineChartCard} from "./components/LineChartCard";
import {AverageBarChartCard} from "./components/AverageBarChartCard";
import {DataGridCard} from "./components/DataGridCard";

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({
          selectedRig,
          handleChangeRig,
          handleChangePeriod,
          selectedEndDate,
          selectedStartDate,
          handleStartDateChange,
          handleEndDateChange,
          handleRemoveSelectedEquipment,
          handleApplyFilters,
          isFetchingEfficiencies,
          isFetchingRigsAverage,
          rigsAverage,
          windowWidth,
          rigs,
          isEmpty,
          totalAvailableHours,
          availableHoursPercentage,
          totalUnavailableHours,
          unavailableHoursPercentage,
          totalDtms,
          totalMovimentations,
          efficiencies,
          user,
          months,
          filterOptions,
          glossPeriods,
          handleToggleFilterType,
          selectedFilterType,
          selectedPeriod,
          selectedYear,
          repairPeriods,
          handleYearChange,
          years,
          selectedEquipment,
          isEfficiencyArrayLarge,
        }) => (
          <div>
            <div className="flex justify-end p-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="default">
                    <FilterIcon /> Abrir Filtros
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <Select
                      error={""}
                      placeholder="Tipo de Filtro"
                      value={selectedFilterType}
                      onChange={(value) =>
                        handleToggleFilterType(value as FilterType)
                      }
                      options={filterOptions}
                    />

                    <Select
                      error={""}
                      placeholder="Sonda"
                      value={selectedRig}
                      onChange={(value) => handleChangeRig(value)}
                      options={rigs.map(({id, name}) => ({
                        value: id ?? "",
                        label: name ?? "",
                      }))}
                    />

                    {selectedFilterType === FilterType.PERIOD && (
                      <>
                        <Select
                          error={""}
                          placeholder="Período"
                          value={selectedPeriod}
                          onChange={(value) => handleChangePeriod(value)}
                          options={months}
                        />

                        <Select
                          error={""}
                          placeholder="Ano"
                          value={selectedYear}
                          onChange={(value) => handleYearChange(value)}
                          options={years}
                        />
                      </>
                    )}

                    {selectedFilterType === FilterType.CUSTOM && (
                      <>
                        <div>
                          <DatePickerInput
                            placeholder="Data de Início"
                            error={""}
                            value={new Date(selectedStartDate)}
                            onChange={(value) => handleStartDateChange(value)}
                          />
                        </div>

                        <div>
                          <DatePickerInput
                            placeholder="Data de Fim"
                            error={""}
                            value={new Date(selectedEndDate)}
                            onChange={(value) => handleEndDateChange(value)}
                          />
                        </div>
                      </>
                    )}

                    <Button onClick={handleApplyFilters}>
                      Aplicar Filtros
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex w-full flex-col">
              <main className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 ">
                <StatboxContainer />

                <div className="grid gap-4 md:gap-8 grid-cols-12 auto-rows-[150px]">
                  <LineChartCard />

                  <AverageBarChartCard />

                  <DataGridCard />

                  <GrouppedRepairsCard />

                  <Card className="col-span-12 lg:col-span-3 row-span-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
                    <CardHeader className="pl-7 ">
                      <div
                        className="flex gap-2 items-center justify-between cursor-pointer"
                        onClick={() => handleRemoveSelectedEquipment()}
                      >
                        <CardTitle>Detalhes do Reparo: </CardTitle>
                        <X />
                      </div>
                    </CardHeader>
                    <CardDescription className="">
                      {selectedEquipment && (
                        <p>
                          {" "}
                          Gráfico com detalhes do equipamento{" "}
                          {translateClassification(selectedEquipment)}.
                        </p>
                      )}

                      {!selectedEquipment && <p>Selecione na lista ao lado.</p>}
                    </CardDescription>
                    <CardContent className="px-2 h-full">
                      {selectedEquipment &&
                        !isFetchingEfficiencies &&
                        repairPeriods.length > 0 && (
                          <div className="max-w-full h-full">
                            <RepairDetailsPieChart />
                          </div>
                        )}

                      {!selectedEquipment &&
                        !isFetchingEfficiencies &&
                        repairPeriods.length > 0 && (
                          <div className="max-w-full h-[75%] flex justify-center items-center ">
                            <PieChart size={96} absoluteStrokeWidth={true} />
                          </div>
                        )}
                    </CardContent>
                  </Card>

                  <GrouppedGlossesCard />

                  <Card className="col-span-12 lg:col-span-3 row-span-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
                    <CardHeader className="pl-7 ">
                      <div
                        className="flex gap-2 items-center justify-between cursor-pointer"
                        onClick={() => handleRemoveSelectedEquipment()}
                      >
                        <CardTitle>Detalhes do Reparo: </CardTitle>
                        <X />
                      </div>
                    </CardHeader>
                    <CardDescription className="">
                      {selectedEquipment && (
                        <p>
                          {" "}
                          Gráfico com detalhes do equipamento{" "}
                          {translateClassification(selectedEquipment)}.
                        </p>
                      )}

                      {!selectedEquipment && <p>Selecione na lista ao lado.</p>}
                    </CardDescription>
                    <CardContent className="px-2 h-full">
                      {selectedEquipment &&
                        !isFetchingEfficiencies &&
                        repairPeriods.length > 0 && (
                          <div className="max-w-full h-full">
                            <RepairDetailsPieChart />
                          </div>
                        )}

                      {!selectedEquipment &&
                        !isFetchingEfficiencies &&
                        repairPeriods.length > 0 && (
                          <div className="max-w-full h-[75%] flex justify-center items-center ">
                            <PieChart size={96} absoluteStrokeWidth={true} />
                          </div>
                        )}
                    </CardContent>
                  </Card>
                </div>
              </main>
            </div>
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
};
