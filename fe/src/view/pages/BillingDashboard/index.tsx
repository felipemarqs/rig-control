import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {Header} from "../../components/Header";
import {
  BillingDashboardContext,
  BillingDashboardProvider,
} from "./BillingDashboardContext";
import {Spinner} from "../../components/Spinner";
import {NotFound} from "../../components/NotFound";
import {BarChart} from "./components/BarChart";
import {ListBillingDataGrid} from "./components/ListBillingDataGrid";

export const BillingDashboard = () => {
  return (
    <BillingDashboardProvider>
      <BillingDashboardContext.Consumer>
        {({
          isEmpty,
          selectedStartDate,
          handleStartDateChange,
          handleEndDateChange,
          selectedEndDate,
          handleApplyFilters,
          isFetchingBillings,
          totalAmount,
        }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header
              title="DASHBOARD DE FATURAMENTO"
              subtitle="Página de visualização da previsão do faturamento geral"
            />
            <div className="w-full flex justify-end gap-4 px-4">
              {/*  <div className="w-[123px]">
                <Select
                  error={""}
                  placeholder="Sonda"
                  value={selectedRig}
                  onChange={(value) => handleChangeRig(value)}
                  options={rigs.map(({id, name}) => ({
                    value: id,
                    label: name,
                  }))}
                />
              </div> */}

              <div>
                <DatePickerInput
                  placeholder="Data de Início"
                  className="h-[42px]"
                  error={""}
                  value={new Date(selectedStartDate)}
                  onChange={(value) => handleStartDateChange(value)}
                />
              </div>

              <div>
                <DatePickerInput
                  placeholder="Data de Fim"
                  className="h-[42px]"
                  error={""}
                  value={new Date(selectedEndDate)}
                  onChange={(value) => handleEndDateChange(value)}
                />
              </div>

              <div>
                <Button className="h-[42px]" onClick={handleApplyFilters}>
                  Aplicar Filtros
                </Button>
              </div>
            </div>
            <div className=" w-full flex justify-center my-6">
              <div className="stats  bg-gray-500">
                {!isFetchingBillings && (
                  <>
                    <div className="stat">
                      <div className="stat-figure text-white">
                        {/*  <div
                          className="radial-progress text-primary-500"
                          style={{"--value": 70} as any} // @ts-ignore
                        >
                          {70 || 0}%
                        </div> */}
                      </div>
                      <div className="stat-title  text-primary-500">
                        Fat. Total
                      </div>
                      <div className="stat-value  text-primary-500">
                        {totalAmount}
                      </div>
                      <div className="stat-desc  text-primary-500">
                        Total de faturamento no período.
                      </div>
                    </div>

                    {/*    <div className="stat">
                      <div className="stat-figure text-red">
                        <div className="stat-figure text-white">
                          <div
                            className="radial-progress text-redAccent-500"
                            style={{"--value": 19} as any}
                          >
                            19%
                          </div>
                        </div>
                      </div>
                      <div className="stat-title text-redAccent-500">
                        Horas Indisp.
                      </div>
                      <div className="stat-value text-redAccent-500">23Hrs</div>
                      <div className="stat-desc text-redAccent-500">
                        Total de não horas faturadas pela sonda
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-figure text-primary-500">
                        <div className="w-16 rounded-full">
                          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white">
                            <Truck size={50} />
                          </div>
                        </div>
                      </div>
                      <div className="stat-value text-primary-500">3</div>
                      <div className="stat-title text-primary-500">DTMs</div>
                      <div className="stat-desc text-primary-500">
                        Total de DTMs no mês
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-figure text-primary-500">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white">
                          <BaggageClaim size={50} />
                        </div>
                      </div>
                      <div className="stat-value text-primary-500">23</div>
                      <div className="stat-title text-primary-500">
                        Movimentações
                      </div>
                      <div className="stat-desc text-primary-500">
                        Total de movimentações no mês
                      </div>
                    </div> */}
                  </>
                )}
              </div>
            </div>

            <div className="min-w-[1050px]  mx-auto max-w-[715px] bg-gray-400 p-4 rounded-md">
              {isEmpty && (
                <>
                  {isFetchingBillings && (
                    <div className="w-full h-full flex justify-center items-center">
                      <Spinner />
                    </div>
                  )}

                  {!isFetchingBillings && (
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
                  <div className=" col-start-2 col-span-10 row-span-3 flex justify-center bg-gray-200 rounded-lg items-center">
                    {isFetchingBillings && <Spinner />}
                    {!isFetchingBillings && <BarChart />}
                  </div>

                  <div className="col-start-2 col-span-10  row-span-3 flex justify-center bg-gray-200 rounded-lg items-center">
                    {isFetchingBillings && <Spinner />}
                    {!isFetchingBillings && <ListBillingDataGrid />}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </BillingDashboardContext.Consumer>
    </BillingDashboardProvider>
  );
};
