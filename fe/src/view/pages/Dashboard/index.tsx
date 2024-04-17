// Importações de componentes e contextos necessários
import {ArrowLeft, CalendarDays, FilterIcon} from "lucide-react";
//import {Button} from "../../components/Button";

import {DashboardContext, DashboardProvider} from "./DashboardContext";

import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {GrouppedRepairsCard} from "./components/GrouppedRepairsCard";
import {GrouppedGlossesCard} from "./components/GrouppedGlossesCard";
import {StatboxContainer} from "./components/StatboxContainer";
import {LineChartCard} from "./components/LineChartCard";
import {AverageBarChartCard} from "./components/AverageBarChartCard";
import {DataGridCard} from "./components/DataGridCard";

import {RepairDetailsPieChartCard} from "./components/RepairDetailsPieChartCard";
import {GlossDetailsPieChartCard} from "./components/GlossDetailsPieChartCard";
import {CustomFilterSheet} from "@/view/components/CustomFilterSheet";
import {Badge} from "@/components/ui/badge";

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({handleApplyFilters, isFetchingEfficiencies}) => (
          <div className="h-full ">
            <div className="flex justify-between p-4 px-10">
              <div className="flex flex-col gap-4">
                <span className="text-gray-800 text-2xl font-semibold tracking-[-1px]">
                  Dashboard por Sonda
                </span>
                <div className="flex  gap-4">
                  <Badge
                    className="flex gap-4 text-primary bg-gray-200 shadow-[rgba(0,_0,_0,_0.14)_0px_3px_4px]"
                    variant="outline"
                  >
                    <CalendarDays absoluteStrokeWidth={false} />{" "}
                    <span>24 de Janeiro a 25 de Fevereiro</span>
                  </Badge>

                  <Badge
                    className="flex gap-4 text-primary bg-gray-200 shadow-[rgba(0,_0,_0,_0.14)_0px_3px_4px]"
                    variant="outline"
                  >
                    <span>SPT 115</span>
                  </Badge>
                </div>
              </div>
              <CustomFilterSheet
                isLoading={isFetchingEfficiencies}
                onApplyFilters={handleApplyFilters}
              />
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
