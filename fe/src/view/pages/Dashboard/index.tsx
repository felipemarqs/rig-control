// Importações de componentes e contextos necessários
import {
  BaggageClaim,
  FilterIcon,
  TimerIcon,
  TimerOff,
  Truck,
} from "lucide-react";
//import {Button} from "../../components/Button";
import { DatePickerInput } from "../../components/DatePickerInput";
import { NotFound } from "../../components/NotFound";
import { Select } from "../../components/Select";
import { Spinner } from "../../components/Spinner";
import { DashboardContext, DashboardProvider } from "./DashboardContext";
import { LineChart } from "./components/LineChart";
import { ListEfficienciesDataGrid } from "../../components/ListEfficienciesDataGrid";
import { cn } from "../../../app/utils/cn";
import { FilterType } from "../../../app/entities/FilterType";
import { GrouppedRepairs } from "./components/GrouppedRepairs";
import { AccessLevel } from "../../../app/entities/AccessLevel";
import { AverageBarChart } from "./components/AverageBarChart";
import { GrouppedGlosses } from "./components/GrouppedGlosses";
import { RepairDetailsPieChart } from "./components/RepairDetailsPieChart";

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useLineChart } from "./components/LineChart/useLineChart";
import { Badge } from "@/components/ui/badge";
import { Indexx } from "./components/GrouppedRepairs/indexx";

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
        }) => (
          <div>
            <div className="w-full  pt-10 overflow-y-scroll bg-red-500">
              <div className="w-full flex flex-wrap justify-center items-center lg:justify-end gap-1 lg:px-4">
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
                    options={rigs.map(({ id, name }) => ({
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
              <div className=" w-full flex justify-center my-6">
                <div className="stats  bg-gray-500">
                  {!isFetchingEfficiencies && !isEmpty && (
                    <>
                      <div className="stat">
                        <div className="stat-figure text-white">
                          <div
                            className="radial-progress text-primary"
                            style={
                              { "--value": availableHoursPercentage } as any
                            }
                          >
                            {availableHoursPercentage || 0}%
                          </div>
                        </div>
                        <div className="stat-title  text-primary">
                          Horas Disp.
                        </div>
                        <div className="stat-value  text-primary">
                          {totalAvailableHours.toFixed()}Hrs
                        </div>
                        <div className="stat-desc  text-primary">
                          Total de horas faturadas pela sonda
                        </div>
                      </div>

                      <div className="stat">
                        <div className="stat-figure text-red">
                          <div className="stat-figure text-white">
                            <div
                              className="radial-progress text-redAccent-500"
                              style={
                                { "--value": unavailableHoursPercentage } as any
                              }
                            >
                              {unavailableHoursPercentage || 0}%
                            </div>
                          </div>
                        </div>
                        <div className="stat-title text-redAccent-500">
                          Horas Indisp.
                        </div>
                        <div className="stat-value text-redAccent-500">
                          {totalUnavailableHours.toFixed()}Hrs
                        </div>
                        <div className="stat-desc text-redAccent-500">
                          Total de não horas faturadas pela sonda
                        </div>
                      </div>

                      <div className="stat">
                        <div className="stat-figure text-primary">
                          <div className="w-16 rounded-full">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white">
                              <Truck size={50} />
                            </div>
                          </div>
                        </div>
                        <div className="stat-value text-primary">
                          {totalDtms}
                        </div>
                        <div className="stat-title text-primary">DTMs</div>
                        <div className="stat-desc text-primary">
                          No período selecionado
                        </div>
                      </div>

                      <div className="stat">
                        <div className="stat-figure text-primary">
                          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white">
                            <BaggageClaim size={50} />
                          </div>
                        </div>
                        <div className="stat-value text-primary">
                          {totalMovimentations}
                        </div>
                        <div className="stat-title text-primary">
                          Movimentações
                        </div>
                        <div className="stat-desc text-primary">
                          No período selecionado
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className=" mx-auto max-w-[1024px] bg-gray-400 min-h-[450px] rounded-md lg:min-w-[1300px] lg:p-4 flex justify-center items-center">
                {isEmpty && (
                  <>
                    {isFetchingEfficiencies && (
                      <div className="w-full h-full flex justify-center items-center">
                        <Spinner />
                      </div>
                    )}

                    {!isFetchingEfficiencies && (
                      <div className="w-full h-full flex justify-center items-center">
                        <NotFound>
                          <strong>Não</strong> existem dados para a{" "}
                          <strong>sonda</strong> no <strong>período</strong>{" "}
                          selecionado!
                        </NotFound>
                      </div>
                    )}
                  </>
                )}

                {!isEmpty && (
                  <div className=" flex-1 grid grid-cols-12 auto-rows-[120px] gap-3">
                    <div
                      className={cn(
                        "col-span-12 row-span-3 flex justify-center bg-gray-200 rounded-lg items-center  lg:row-span-3 lg:col-start-0 lg:col-span-12"
                      )}
                    >
                      {isFetchingEfficiencies && <Spinner />}
                      {!isFetchingEfficiencies && <LineChart />}
                    </div>

                    {/*    <div className="col-span-6 row-span-2 flex justify-center bg-gray-200 rounded-lg items-center">
                    {isFetchingEfficiencies && <Spinner />}
                    {!isFetchingEfficiencies && <LineChart />}
                  </div>*/}

                    <div
                      className={`col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6  `}
                    >
                      {isFetchingEfficiencies && <Spinner />}
                      {repairPeriods.length === 0 &&
                        !isFetchingEfficiencies && (
                          <div className="flex justify-center  items-center">
                            <NotFound>
                              <strong>Não</strong> existem dados de{" "}
                              <strong>reparos</strong> para a{" "}
                              <strong>sonda</strong> no <strong>período</strong>{" "}
                              selecionado!
                            </NotFound>
                          </div>
                        )}
                      {!isFetchingEfficiencies && repairPeriods.length > 0 && (
                        <div className="w-full h-full">
                          <GrouppedRepairs />
                        </div>
                      )}
                    </div>

                    {selectedEquipment && (
                      <div className="col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6 lg:row-span-3">
                        {isFetchingEfficiencies && <Spinner />}
                        {repairPeriods.length === 0 &&
                          !isFetchingEfficiencies && (
                            <div className="flex justify-center items-center">
                              <NotFound>
                                <strong>Não</strong> existem dados para a{" "}
                                <strong>sonda</strong> no{" "}
                                <strong>período</strong> selecionado!
                              </NotFound>
                            </div>
                          )}
                        {!isFetchingEfficiencies &&
                          repairPeriods.length > 0 && (
                            <div className="w-full h-full">
                              <RepairDetailsPieChart />
                            </div>
                          )}
                      </div>
                    )}

                    <div
                      className={`col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6  `}
                    >
                      {isFetchingEfficiencies && <Spinner />}
                      {glossPeriods.length === 0 && !isFetchingEfficiencies && (
                        <div className="flex justify-center  items-center">
                          <NotFound>
                            <strong>Não</strong> existem dados de{" "}
                            <strong>glosa</strong> para a <strong>sonda</strong>{" "}
                            no <strong>período</strong> selecionado!
                          </NotFound>
                        </div>
                      )}
                      {!isFetchingEfficiencies && glossPeriods.length > 0 && (
                        <div className="w-full h-full">
                          <GrouppedGlosses />
                        </div>
                      )}
                    </div>

                    {user?.accessLevel === AccessLevel.ADM && (
                      <div className="col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6 lg:row-span-3">
                        {isFetchingRigsAverage && <Spinner />}
                        {rigsAverage.length === 0 && !isFetchingRigsAverage && (
                          <div className="flex justify-center items-center">
                            <NotFound>
                              <strong>Não</strong> existem dados para a{" "}
                              <strong>sonda</strong> no <strong>período</strong>{" "}
                              selecionado!
                            </NotFound>
                          </div>
                        )}
                        {!isFetchingRigsAverage && rigsAverage.length > 0 && (
                          <div className="w-full h-full">
                            <AverageBarChart />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="col-span-12 row-span-3 flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6">
                      {isFetchingEfficiencies && <Spinner />}

                      {/* {!isFetchingEfficiencies && (
                        <div className="w-full h-full">
                          <ListEfficienciesDataGrid
                            data={efficiencies}
                            isDashboard
                          />
                        </div>
                      )} */}
                    </div>
                  </div>
                )}
              </div>
              {/*       <Modal
              title="Novidades e Melhorias Recentes!!"
              maxWidth="1000px"
              open={!isAlertSeen}
              onClose={handleIsAlertSeen}
            >
              <div className="text-gray-600 flex items-center">
                <div className=" flex-1 flex items-center justify-center">
                  <AddFiles className="h-60 w-60" />
                </div>
                <div className=" flex-1">
                  <span className="block text-gray-800 font-semibold">
                    Olá {user?.name},
                  </span>

                  <span className="text-gray-800 font-semibold">
                    Confira as últimas{" "}
                    <span className="text-primary">atualizações</span> e
                    melhorias que fizemos no sistema para aprimorar ainda mais
                    sua <span className="text-primary">experiência</span>.
                    Confira as novidades:
                  </span>
                  <ul className="list-disc list-inside">
                    <li className="my-4">Novidades no Dashboard!</li>
                    <span>
                      Adicionado novo um gráfico ao Dashboard 📊, exibindo a
                      quantidade de reparos realizados em equipamentos durante o
                      período selecionado!
                    </span>
                    <li className="my-4">Nova Página de Relatórios!</li>
                    <span>
                      Apresentamos uma nova página de relatórios que facilitará
                      sua análise de dados. Agora, é possível organizar períodos
                      com base em tipo e classificação, proporcionando uma
                      visualização mais detalhada e personalizada das
                      informações.
                    </span>
                  </ul>
                </div>
              </div>
            </Modal> */}
            </div>
            <div className="flex w-full flex-col">
              <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
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
                      <div className="text-2xl font-bold">{totalDtms}</div>
                      <p className="text-xs text-muted-foreground">
                        Total de monivmentações de Equipamentos e Fluidos no
                        período selecionado
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:gap-8 grid-cols-12">
                  {!isEmpty && !isFetchingEfficiencies && (
                    <Card className="col-span-12  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                      <CardHeader className="pb-0">
                        <CardTitle>Eficiência Diária</CardTitle>
                        <CardDescription>Gráfico com os dias</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 h-4/5">
                        {isFetchingEfficiencies && <Spinner />}
                        {!isFetchingEfficiencies && <LineChart />}
                      </CardContent>
                    </Card>
                  )}
                  <Card className="col-span-12 lg:col-span-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
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
                    <CardContent>
                      {" "}
                      <div className="max-w-full">
                        <ListEfficienciesDataGrid
                          data={efficiencies}
                          isDashboard
                          windowWidth={windowWidth}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-12 lg:col-span-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] max-h-[494px] overflow-hidden overflow-y-scroll">
                    <CardHeader className="px-7">
                      <CardTitle>Reparos</CardTitle>
                      <CardDescription>
                        Lista dos reparos de equipamentos durante o período
                        selecionado.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Indexx />
                    </CardContent>
                  </Card>

                  <Card className="col-span-12 lg:col-span-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] max-h-[494px] ">
                    <CardHeader className="px-7">
                      <CardTitle>Detalhes do Reparo</CardTitle>
                      <CardDescription>
                        Gráfico com detalhes do equipamento selecionado.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-2 h-full">
                      {selectedEquipment &&
                        !isFetchingEfficiencies &&
                        repairPeriods.length > 0 && (
                          <div className="max-w-full h-full">
                            <RepairDetailsPieChart />
                          </div>
                        )}
                    </CardContent>
                  </Card>

                  <div className="col-span-12   flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6 ">
                    {isFetchingEfficiencies && <Spinner />}
                    {selectedEquipment &&
                      repairPeriods.length === 0 &&
                      !isFetchingEfficiencies && (
                        <div className="flex justify-center items-center">
                          <NotFound>
                            <strong>Não</strong> existem dados para a{" "}
                            <strong>sonda</strong> no <strong>período</strong>{" "}
                            selecionado!
                          </NotFound>
                        </div>
                      )}
                  </div>
                </div>
              </main>
            </div>
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
};
