// Importações de componentes e contextos necessários
import {DashboardContext, DashboardProvider} from "./DashboardContext";
import {GrouppedRepairsCard} from "./components/GrouppedRepairsCard";
import {GrouppedGlossesCard} from "./components/GrouppedGlossesCard";
import {StatboxContainer} from "./components/StatboxContainer";
import {LineChartCard} from "./components/LineChartCard";
import {AverageBarChartCard} from "./components/AverageBarChartCard";
import {DataGridCard} from "./components/DataGridCard";
import {RepairDetailsPieChartCard} from "./components/RepairDetailsPieChartCard";
import {GlossDetailsPieChartCard} from "./components/GlossDetailsPieChartCard";
import {CustomFilterSheet} from "@/view/components/CustomFilterSheet";
import {BagdeStatus} from "@/view/components/BagdeStatus";

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({handleApplyFilters, isFetchingEfficiencies}) => (
          <div className="h-full ">
            <div className="flex justify-between p-4 px-10">
              <div className="flex flex-col gap-4">
                <span className="hidden lg:inline text-gray-800 text-2xl font-semibold tracking-[-1px]">
                  Dashboard por Sonda
                </span>
                <BagdeStatus displayRig />
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
