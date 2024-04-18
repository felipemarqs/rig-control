import {
  BillingDashboardContext,
  BillingDashboardProvider,
} from "./BillingDashboardContext";
import "swiper/css";
import {FilterSheet} from "@/view/components/FilterSheet";
import {StatboxContainer} from "./components/StatboxContainer";
import {BarChartCard} from "./components/BarChartCard";
import {RigBillingConfigListCard} from "./components/RigBillingConfigListCard";
import {EditConfigModal} from "./modals/EditConfigModal";

export const BillingDashboard = () => {
  return (
    <BillingDashboardProvider>
      <BillingDashboardContext.Consumer>
        {({handleApplyFilters, isFetchingBillings, configBeingEdited}) => (
          <>
            <div className="flex justify-end p-4">
              <FilterSheet
                onApplyFilters={handleApplyFilters}
                isLoading={isFetchingBillings}
              />

              {/*  <Tabs defaultValue="all">
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
              </Tabs> */}
            </div>

            <div className="flex w-full flex-col">
              <main className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 ">
                <StatboxContainer />
                <div className="grid gap-4 md:gap-8 grid-cols-12 auto-rows-[150px]">
                  <BarChartCard />
                  <RigBillingConfigListCard />
                </div>
              </main>
            </div>
            {configBeingEdited && <EditConfigModal />}
          </>
        )}
      </BillingDashboardContext.Consumer>
    </BillingDashboardProvider>
  );
};
