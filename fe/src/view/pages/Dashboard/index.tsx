// Importações de componentes e contextos necessários
import {FilterIcon, PieChart, X} from "lucide-react";
//import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";

import {Select} from "../../components/Select";
import {DashboardContext, DashboardProvider} from "./DashboardContext";

import {FilterType} from "../../../app/entities/FilterType";

import {RepairDetailsPieChart} from "./components/RepairDetailsPieChart";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import {GrouppedRepairsCard} from "./components/GrouppedRepairsCard";
import {GrouppedGlossesCard} from "./components/GrouppedGlossesCard";
import {StatboxContainer} from "./components/StatboxContainer";
import {LineChartCard} from "./components/LineChartCard";
import {AverageBarChartCard} from "./components/AverageBarChartCard";
import {DataGridCard} from "./components/DataGridCard";
import {GlossDetailsPieChart} from "./components/GlossDetailsPieChart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";

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
          rigs,
          months,
          filterOptions,
          handleToggleFilterType,
          selectedFilterType,
          selectedPeriod,
          selectedYear,
          repairPeriods,
          handleYearChange,
          years,
          selectedEquipment,
          selectedGloss,
        }) => (
          <div>
            <div className="flex justify-end p-4">
              <Sheet>
                <SheetTrigger>
                  {" "}
                  <Button className="gap-2" variant="default">
                    <FilterIcon /> Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-card">
                  <SheetHeader>
                    <SheetDescription>
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
                        )}

                        <Button
                          onClick={handleApplyFilters}
                          disabled={isFetchingEfficiencies}
                          className={cn(
                            "",
                            isFetchingEfficiencies ? "cursor-not-allowed" : ""
                          )}
                        >
                          Aplicar Filtros
                        </Button>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
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
                        <CardTitle>Detalhes da Glosa: </CardTitle>
                        <X />
                      </div>
                    </CardHeader>

                    <CardContent className="px-2 h-full">
                      {selectedGloss &&
                        !isFetchingEfficiencies &&
                        repairPeriods.length > 0 && (
                          <div className="max-w-full h-full">
                            <GlossDetailsPieChart />
                          </div>
                        )}

                      {!selectedGloss &&
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
