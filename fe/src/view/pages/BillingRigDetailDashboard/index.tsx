import {Header} from "../../components/Header";
import {
  BillingRigDetailDashboardContext,
  BillingRigDetailDashboardProvider,
} from "./BillingRigDetailDashboardContext";
import {Spinner} from "../../components/Spinner";
import {NotFound} from "../../components/NotFound";
import {ListBillingDataGrid} from "./components/ListBillingDataGrid";
import "swiper/css";
import {formatCurrency} from "../../../app/utils/formatCurrency";
import {CustomFilterSheet} from "@/view/components/CustomFilterSheet";
import {StatboxContainer} from "./components/StatboxContainer";
import {DataGridCard} from "./components/DataGridCard";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export const BillingRigDetailDashboard = () => {
  return (
    <BillingRigDetailDashboardProvider>
      <BillingRigDetailDashboardContext.Consumer>
        {({isEmpty, handleApplyFilters, isFetchingBilling, totalAmount}) => (
          <>
            <div className="w-full h-full overflow-y-scroll">
              <Header
                title="DASHBOARD DE wwFATURAMENTO"
                subtitle="Página de visualização da previsão do faturamento geral da sonda"
              />
              <CustomFilterSheet
                isLoading={isFetchingBilling}
                onApplyFilters={handleApplyFilters}
              />

              <div className=" w-full flex justify-center my-6 ">
                {/*    {!isEmpty && ( */}
                <div className="stats  bg-gray-500">
                  {!isFetchingBilling && (
                    <>
                      <div className="stat">
                        <div className="stat-figure text-white">
                          {/*  <div
                          className="radial-progress text-primary"
                          style={{"--value": 70} as any} // @ts-ignore
                        >
                          {70 || 0}%
                        </div> */}
                        </div>
                        <div className="stat-title  text-primary">
                          Fat. Total
                        </div>
                        <div className="stat-value  text-primary">
                          {formatCurrency(totalAmount)}
                        </div>
                        <div className="stat-desc  text-primary">
                          Total de faturamento no período.
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className=" mx-auto max-w-[1024px] bg-gray-400  rounded-md lg:min-w-[1300px] lg:p-4">
                {isEmpty && (
                  <>
                    {isFetchingBilling && (
                      <div className="w-full h-full flex justify-center items-center">
                        <Spinner />
                      </div>
                    )}

                    {!isFetchingBilling && (
                      <NotFound>
                        <strong>Não</strong> existem dados para a{" "}
                        <strong>sonda</strong> no <strong>período</strong>{" "}
                        selecionado!
                      </NotFound>
                    )}
                  </>
                )}

                {!isEmpty && (
                  <div className="grid grid-cols-12 auto-rows-[120px] gap-3">
                    <div className="col-span-12  row-span-4 flex justify-center bg-gray-200 rounded-lg items-center">
                      {isFetchingBilling && <Spinner />}
                      {!isFetchingBilling && <ListBillingDataGrid />}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end p-4">
              <CustomFilterSheet
                isLoading={isFetchingBilling}
                onApplyFilters={handleApplyFilters}
              />
            </div>
            <div className="flex w-full flex-col">
              <main className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 ">
                <div className="grid gap-4 md:gap-8 grid-cols-12 auto-rows-[150px]">
                  <StatboxContainer />
                  <DataGridCard />
                  <Card className=" col-span-12 row-span-2 lg:col-span-7 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Faturamento Total
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatCurrency(totalAmount)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Faturamento total no período selecionado
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </main>
            </div>
          </>
        )}
      </BillingRigDetailDashboardContext.Consumer>
    </BillingRigDetailDashboardProvider>
  );
};
