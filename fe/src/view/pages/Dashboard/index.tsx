// Importações de componentes e contextos necessários
import {ArrowLeft, FilterIcon} from "lucide-react";
//import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";

import {Select} from "../../components/Select";
import {DashboardContext, DashboardProvider} from "./DashboardContext";

import {FilterType} from "../../../app/entities/FilterType";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {GrouppedRepairsCard} from "./components/GrouppedRepairsCard";
import {GrouppedGlossesCard} from "./components/GrouppedGlossesCard";
import {StatboxContainer} from "./components/StatboxContainer";
import {LineChartCard} from "./components/LineChartCard";
import {AverageBarChartCard} from "./components/AverageBarChartCard";
import {DataGridCard} from "./components/DataGridCard";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {RepairDetailsPieChartCard} from "./components/RepairDetailsPieChartCard";
import {GlossDetailsPieChartCard} from "./components/GlossDetailsPieChartCard";

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
          rigs,
          months,
          filterOptions,
          handleToggleFilterType,
          selectedFilterType,
          selectedPeriod,
          selectedYear,
          handleYearChange,
          years,
        }) => (
          <div>
            <div className="flex justify-between p-4">
              <Link to="/global-dashboard">
                <Button className="gap-2" variant="default">
                  <ArrowLeft /> Dashboard Geral
                </Button>
              </Link>
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

                  <RepairDetailsPieChartCard />

                  <GrouppedGlossesCard />

                  <GlossDetailsPieChartCard />
                </div>
              </main>
            </div>
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
};
