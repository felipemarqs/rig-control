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

import {Progress} from "@/components/ui/progress";
import {GrouppedRepairsCard} from "./components/GrouppedRepairsCard";
import {translateClassification} from "@/app/utils/translateClassification";
import {GrouppedGlossesCard} from "./components/GrouppedGlossesCard";

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
            <div className="w-full flex pt-2 flex-wrap justify-center items-center lg:justify-end gap-1 lg:px-4">
              <div className="w-[113px] lg:w-[250px]">
                <Select
                  error={""}
                  placeholder="Tipo de Filtro"
                  value={selectedFilterType}
                  onChange={(value) =>
                    handleToggleFilterType(value as FilterType)
                  }
                  options={filterOptions}
                />
              </div>
              <div className="w-[113px] lg:w-[123px]">
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
              </div>
              {selectedFilterType === FilterType.PERIOD && (
                <>
                  <div className="w-[113px] lg:w-[123px]">
                    <Select
                      error={""}
                      placeholder="Período"
                      value={selectedPeriod}
                      onChange={(value) => handleChangePeriod(value)}
                      options={months}
                    />
                  </div>

                  <div className="w-[113px] lg:w-[123px]">
                    <Select
                      error={""}
                      placeholder="Ano"
                      value={selectedYear}
                      onChange={(value) => handleYearChange(value)}
                      options={years}
                    />
                  </div>
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

              <div>
                <Button
                  className="h-[32px] lg:h-[52px]"
                  onClick={handleApplyFilters}
                >
                  <FilterIcon />
                </Button>
              </div>
            </div>

            <div className="flex w-full flex-col">
              <main className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 ">
                {/* Início do Statbox Container */}
                <div className="grid gap-4  md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                  <Card
                    x-chunk="dashboard-01-chunk-0"
                    className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Horas Disponiveis
                      </CardTitle>
                      <TimerIcon className="h-8 w-8 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {totalAvailableHours.toFixed()}Hrs
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Total de horas faturadas pela sonda
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Progress value={availableHoursPercentage} />
                    </CardFooter>
                  </Card>
                  <Card
                    x-chunk="dashboard-01-chunk-0"
                    className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-redAccent-500">
                        Horas Indisponiveis
                      </CardTitle>
                      <TimerOff className="h-8 w-8 text-muted-foreground text-redAccent-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-redAccent-500">
                        {totalUnavailableHours.toFixed()}Hrs
                      </div>
                      <p className="text-xs text-muted-foreground text-redAccent-500">
                        Total de horas não faturadas pela sonda
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Progress
                        value={unavailableHoursPercentage}
                        indicatorColor="bg-redAccent-500"
                        className="bg-redAccent-500/20"
                      />
                    </CardFooter>
                  </Card>
                  <Card
                    x-chunk="dashboard-01-chunk-2"
                    className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">DTM</CardTitle>
                      <Truck className="h-8 w-8 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalDtms}</div>
                      <p className="text-xs text-muted-foreground">
                        Total de DTMs no período selecionado
                      </p>
                    </CardContent>
                  </Card>
                  <Card
                    x-chunk="dashboard-01-chunk-2"
                    className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Movimentações
                      </CardTitle>
                      <BaggageClaim className="h-8 w-8 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {totalMovimentations}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Total de monivmentações de Equipamentos e Fluidos no
                        período selecionado
                      </p>
                    </CardContent>
                  </Card>
                </div>
                {/* Fim do Statbox Container */}
                <div className="grid gap-4 md:gap-8 grid-cols-12 auto-rows-[150px]">
                  {/* Início do LineChart Container */}

                  <Card
                    className={cn(
                      "col-span-12 row-span-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                    )}
                  >
                    <CardHeader className="pb-0">
                      <CardTitle>Eficiência Diária</CardTitle>
                      <CardDescription>Gráfico com os dias</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 h-4/5  flex justify-center items-center">
                      {isFetchingEfficiencies && <Spinner />}
                      {!isFetchingEfficiencies && !isEmpty && <LineChart />}
                      {!isFetchingEfficiencies && isEmpty && (
                        <NotFound>
                          {
                            <p>
                              Sem dados para o <strong>período</strong>{" "}
                              selecionado
                            </p>
                          }
                        </NotFound>
                      )}
                    </CardContent>
                  </Card>

                  {/* Fim do LineChart Container */}

                  <Card className="col-span-12 row-span-3 lg:col-span-7 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
                    <CardHeader className="px-7">
                      <CardTitle>Média </CardTitle>
                      <CardDescription>
                        Gráfico com a média de todas as sondas durante o período
                        selecionado.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="w-full h-full">
                      <div className="max-w-full h-full">
                        <AverageBarChart />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Inicio do Datagrid Container */}
                  <Card className="col-span-12 row-span-3 lg:col-span-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                    <CardHeader className="flex flex-row items-center">
                      <div className="grid gap-2">
                        <CardTitle>Ocorrências</CardTitle>
                        <CardDescription>
                          Lista de Ocorrências do período selecionado
                        </CardDescription>
                      </div>
                      <Button asChild size="sm" className="ml-auto gap-1">
                        <Link to="/">
                          View All
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardHeader>
                    <CardContent className="p-0 h-4/5 ">
                      {isFetchingEfficiencies && (
                        <div className="h-full flex items-center justify-center">
                          <Spinner />
                        </div>
                      )}
                      {!isEmpty && !isFetchingEfficiencies && (
                        <div className="max-w-full">
                          <ListEfficienciesDataGrid
                            data={efficiencies}
                            isDashboard
                            windowWidth={windowWidth}
                          />
                        </div>
                      )}

                      {isEmpty && !isFetchingEfficiencies && (
                        <div className="h-full flex items-center justify-center">
                          <NotFound>
                            {
                              <p>
                                Sem dados para o <strong>período</strong>{" "}
                                selecionado
                              </p>
                            }
                          </NotFound>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Fim do Datagrid Container */}

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
