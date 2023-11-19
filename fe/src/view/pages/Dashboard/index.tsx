import {BaggageClaim, Truck} from "lucide-react";
import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {Header} from "../../components/Header";
import {NotFound} from "../../components/NotFound";
import {Select} from "../../components/Select";
import {Spinner} from "../../components/Spinner";
import {DashboardContext, DashboardProvider} from "./DashboardContext";
import {LineChart} from "./components/LineChart";
import {ListEfficienciesDataGrid} from "../../components/ListEfficienciesDataGrid";
import {cn} from "../../../app/utils/cn";
import {BarChart} from "./components/BarChart";

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({
          selectedRig,
          handleChangeRig,
          selectedEndDate,
          selectedStartDate,
          handleStartDateChange,
          handleEndDateChange,
          handleApplyFilters,
          isFetchingEfficiencies,
          rigs,
          signout,
          isEmpty,
          totalAvailableHours,
          availableHoursPercentage,
          totalUnavailableHours,
          unavailableHoursPercentage,
          totalDtms,
          totalMovimentations,
          efficiencies,
          isFetchingAverage,
        }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header title="DASHBOARD" subtitle="Página de início do usuário" />
            <div className="w-full flex justify-end gap-4 px-4">
              <div className="w-[123px]">
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
              </div>

              <div>
                <DatePickerInput
                  placeholder="Data de Início"
                  error={""}
                  value={new Date(selectedStartDate)}
                  onChange={(value) => handleStartDateChange(value)}
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

              <div>
                <Button className="h-[42px]" onClick={handleApplyFilters}>
                  Aplicar Filtros
                </Button>
              </div>
            </div>
            <div className=" w-full flex justify-center my-6">
              <div className="stats  bg-gray-500">
                {!isFetchingEfficiencies && (
                  <>
                    <div className="stat">
                      <div className="stat-figure text-white">
                        <div
                          className="radial-progress text-primary-500"
                          style={{"--value": availableHoursPercentage} as any}
                        >
                          {availableHoursPercentage || 0}%
                        </div>
                      </div>
                      <div className="stat-title  text-primary-500">
                        Horas Disp.
                      </div>
                      <div className="stat-value  text-primary-500">
                        {totalAvailableHours.toFixed()}Hrs
                      </div>
                      <div className="stat-desc  text-primary-500">
                        Total de horas faturadas pela sonda
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-figure text-red">
                        <div className="stat-figure text-white">
                          <div
                            className="radial-progress text-redAccent-500"
                            style={
                              {"--value": unavailableHoursPercentage} as any
                            }
                          >
                            {unavailableHoursPercentage || 0}%
                          </div>
                        </div>
                      </div>
                      <div className="stat-title text-redAccent-500">
                        Horas Indisp.
                      </div>
                      <div className="stat-value text-redAccent-500">
                        {totalUnavailableHours.toFixed()}Hrs
                      </div>
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
                      <div className="stat-value text-primary-500">
                        {totalDtms}
                      </div>
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
                      <div className="stat-value text-primary-500">
                        {totalMovimentations}
                      </div>
                      <div className="stat-title text-primary-500">
                        Movimentações
                      </div>
                      <div className="stat-desc text-primary-500">
                        Total de movimentações no mês
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="min-w-[1300px]  mx-auto max-w-[715px] bg-gray-400 p-4 rounded-md">
              {isEmpty && (
                <>
                  {isFetchingEfficiencies && (
                    <div className="w-full h-full flex justify-center items-center">
                      <Spinner />
                    </div>
                  )}

                  {!isFetchingEfficiencies && (
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
                  <div
                    className={cn(
                      " col-start-3 col-span-8 row-span-3 flex justify-center bg-gray-200 rounded-lg items-center",
                      efficiencies.length > 15 && "col-start-1 col-span-12"
                    )}
                  >
                    {isFetchingEfficiencies && <Spinner />}
                    {!isFetchingEfficiencies && <LineChart />}
                  </div>

                  {/*    <div className="col-span-6 row-span-2 flex justify-center bg-gray-200 rounded-lg items-center">
                    {isFetchingEfficiencies && <Spinner />}
                    {!isFetchingEfficiencies && <LineChart />}
                  </div>*/}

                  <div className="col-start-2 col-span-10 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center">
                    {isFetchingAverage && <Spinner />}
                    {!isFetchingAverage && (
                      <div className="w-full h-full">
                        <BarChart />
                      </div>
                    )}
                  </div>

                  <div className="col-start-2 col-span-10 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center">
                    {isFetchingEfficiencies && <Spinner />}
                    {!isFetchingEfficiencies && (
                      <div className="w-full h-full">
                        <ListEfficienciesDataGrid
                          data={efficiencies}
                          isDashboard
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button onClick={signout}>Sair</button>
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
};
