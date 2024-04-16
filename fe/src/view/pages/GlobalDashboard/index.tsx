// Importações de componentes e contextos necessários
import {ArrowLeft, FilterIcon} from "lucide-react";
import {DatePickerInput} from "../../components/DatePickerInput";
import {NotFound} from "../../components/NotFound";
import {Spinner} from "../../components/Spinner";
import {AverageBarChart} from "./components/AverageBarChartCard/components/AverageBarChart";
import {
  GlobalDashboardContext,
  GlobalDashboardProvider,
} from "./GlobalDashboardContext";
import {UnbilledPeriodsPieChart} from "./components/UnbilledPeriodsPieChartCard/UnbilledPeriodsPieChart";
import {DaysNotRegistered} from "./components/DaysNotRegisteredCard/components/DaysNotRegistered";
import {StatboxContainer} from "./components/StatboxContainer";
import {Link} from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {DaysNotRegisteredCard} from "./components/DaysNotRegisteredCard";
import {AverageBarChartCard} from "./components/AverageBarChartCard";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UnbilledPeriodsPieChartCard} from "./components/UnbilledPeriodsPieChartCard";
import {PeriodsDetailsPieChartCard} from "./components/PeriodsDetailsPieChartCard";

export const GlobalDashboard = () => {
  return (
    <GlobalDashboardProvider>
      <GlobalDashboardContext.Consumer>
        {({
          isDetailsGraphVisible,
          selectedEndDate,
          selectedStartDate,
          handleStartDateChange,
          handleEndDateChange,
          handleApplyFilters,
          isFetchingRigsAverage,
          rigsAverage,
          isChartDataEmpty,
          isEmpty,
          statBox,
          isFetchingUnbilledPeriods,
          handleChangeDashboardView,
          selectedDashboardView,
        }) => (
          <div>
            <div className="flex justify-between p-4">
              <Link to="/dashboard">
                <Button className="gap-2" variant="default">
                  <ArrowLeft />{" "}
                  <span className="hidden lg:inline">Dashboard</span>
                </Button>
              </Link>
              <div className="flex flex-row-reverse gap-2">
                <Sheet>
                  <SheetTrigger>
                    {" "}
                    <Button className="gap-2" variant="default">
                      <FilterIcon />{" "}
                      <span className="hidden lg:inline">Filtros</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="bg-card">
                    <SheetHeader>
                      <SheetDescription>
                        <div className="grid gap-4">
                          <>
                            <div>
                              <DatePickerInput
                                placeholder="Data de Início"
                                error={""}
                                value={new Date(selectedStartDate)}
                                onChange={(value) =>
                                  handleStartDateChange(value)
                                }
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

                          <Button
                            onClick={handleApplyFilters}
                            disabled={isFetchingRigsAverage}
                            className={cn(
                              isFetchingRigsAverage ? "cursor-not-allowed" : ""
                            )}
                          >
                            Aplicar Filtros
                          </Button>
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger
                      value="all"
                      onClick={() => handleChangeDashboardView("ALL")}
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="active"
                      onClick={() => handleChangeDashboardView("BA")}
                    >
                      BA
                    </TabsTrigger>
                    <TabsTrigger
                      value="draft"
                      onClick={() => handleChangeDashboardView("AL")}
                    >
                      AL
                    </TabsTrigger>
                    <TabsTrigger
                      value="archived"
                      onClick={() => handleChangeDashboardView("SE")}
                    >
                      SE
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="sm:hidden w-full flex justify-center my-6">
              <div className="stats  bg-gray-500">
                {!isFetchingRigsAverage && !(rigsAverage.length === 0) && (
                  <>
                    <div className="stat">
                      <div className="stat-figure text-white">
                        <div
                          className="radial-progress text-primary"
                          style={
                            {
                              "--value": statBox.averageHoursPercentage,
                            } as any
                          }
                        >
                          {statBox.averageHoursPercentage || 0}%
                        </div>
                      </div>
                      <div className="stat-title  text-primary">
                        Disp. Diária
                      </div>
                      <div className="stat-value  text-primary">
                        {statBox.averageHours} Hrs
                      </div>
                      <div className="stat-desc  text-primary">
                        Média de disponibilidade diária
                      </div>
                    </div>
                    <div className="stat  border-r border-primary-300">
                      <div className="stat-title  text-primary">
                        Sondas Cadastradas
                      </div>
                      <div className="stat-value  text-primary">9</div>
                      <div className="stat-desc  text-primary">
                        Sondas Cadastradas no sistema
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="sm:hidden mx-auto max-w-[1300px] bg-gray-400 min-h-[450px] rounded-md  lg:p-4 flex justify-center items-center">
              {isEmpty && (
                <>
                  {isFetchingRigsAverage && (
                    <div className="w-full h-full flex justify-center items-center">
                      <Spinner />
                    </div>
                  )}

                  {!isFetchingRigsAverage && (
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
                  <div className="col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:row-span-3">
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

                  {!isChartDataEmpty && (
                    <>
                      <div className="col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6 lg:row-span-3">
                        {isFetchingRigsAverage && <Spinner />}
                        {rigsAverage.length === 0 &&
                          !isFetchingUnbilledPeriods && (
                            <div className="flex justify-center items-center">
                              <NotFound>
                                <strong>Não</strong> existem dados para a{" "}
                                <strong>sonda</strong> no{" "}
                                <strong>período</strong> selecionado!
                              </NotFound>
                            </div>
                          )}
                        {!isFetchingUnbilledPeriods &&
                          rigsAverage.length > 0 && (
                            <div className="w-full h-full">
                              <UnbilledPeriodsPieChart />
                            </div>
                          )}
                      </div>

                      {isDetailsGraphVisible && <PeriodsDetailsPieChartCard />}
                    </>
                  )}
                  <div
                    className={`col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6  `}
                  >
                    {isFetchingRigsAverage && <Spinner />}
                    {isEmpty && !isFetchingRigsAverage && (
                      <div className="flex justify-center  items-center">
                        <NotFound>
                          <strong>Não</strong> existem dados de{" "}
                          <strong>reparos</strong> para a <strong>sonda</strong>{" "}
                          no <strong>período</strong> selecionado!
                        </NotFound>
                      </div>
                    )}
                    {!isFetchingRigsAverage && !isEmpty && (
                      <div className="w-full h-full">
                        <DaysNotRegistered />
                      </div>
                    )}
                  </div>

                  {/*    <div className="col-span-6 row-span-2 flex justify-center bg-gray-200 rounded-lg items-center">
                    {isFetchingEfficiencies && <Spinner />}
                    {!isFetchingEfficiencies && <LineChart />}
                  </div>*/}
                </div>
              )}
            </div>

            <div className="flex w-full flex-col">
              <main className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 ">
                <StatboxContainer />
                <div className="grid gap-4 md:gap-8 grid-cols-12 auto-rows-[150px]">
                  <AverageBarChartCard />
                  <DaysNotRegisteredCard />
                  {!isChartDataEmpty && selectedDashboardView === "ALL" && (
                    <>
                      <UnbilledPeriodsPieChartCard />
                      {isDetailsGraphVisible && <PeriodsDetailsPieChartCard />}
                    </>
                  )}
                </div>
              </main>
            </div>
          </div>
        )}
      </GlobalDashboardContext.Consumer>
    </GlobalDashboardProvider>
  );
};
