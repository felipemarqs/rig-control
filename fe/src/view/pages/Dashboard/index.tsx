// Importações de componentes e contextos necessários
import {ArrowLeft, FilterIcon} from "lucide-react";
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

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({handleApplyFilters, isFetchingEfficiencies}) => (
          <div>
            <div className="flex justify-between p-4">
              <Link to="/global-dashboard">
                <Button className="gap-2" variant="default">
                  <ArrowLeft /> Dashboard Geral
                </Button>
              </Link>

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
