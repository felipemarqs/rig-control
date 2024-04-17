// Importações de componentes e contextos necessários
import {ArrowLeft} from "lucide-react";

import {
  GlobalDashboardContext,
  GlobalDashboardProvider,
} from "./GlobalDashboardContext";

import {StatboxContainer} from "./components/StatboxContainer";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {DaysNotRegisteredCard} from "./components/DaysNotRegisteredCard";
import {AverageBarChartCard} from "./components/AverageBarChartCard";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UnbilledPeriodsPieChartCard} from "./components/UnbilledPeriodsPieChartCard";
import {PeriodsDetailsPieChartCard} from "./components/PeriodsDetailsPieChartCard";
import {FilterSheet} from "@/view/components/FilterSheet";

export const GlobalDashboard = () => {
  return (
    <GlobalDashboardProvider>
      <GlobalDashboardContext.Consumer>
        {({
          isDetailsGraphVisible,
          handleApplyFilters,
          isFetchingRigsAverage,
          isChartDataEmpty,
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
                <FilterSheet
                  onApplyFilters={handleApplyFilters}
                  isLoading={isFetchingRigsAverage}
                />
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger
                      value="all"
                      onClick={() => handleChangeDashboardView("ALL")}
                    >
                      Todos
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
