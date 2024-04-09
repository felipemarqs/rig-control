// Importações de componentes e contextos necessários
import {BaggageClaim, FilterIcon, Truck} from "lucide-react";
import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {NotFound} from "../../components/NotFound";
import {Select} from "../../components/Select";
import {Spinner} from "../../components/Spinner";
import {DashboardContext, DashboardProvider} from "./DashboardContext";
import {LineChart} from "./components/LineChart";
import {ListEfficienciesDataGrid} from "../../components/ListEfficienciesDataGrid";
import {cn} from "../../../app/utils/cn";
import {FilterType} from "../../../app/entities/FilterType";
import {GrouppedRepairs} from "./components/GrouppedRepairs";
import {AccessLevel} from "../../../app/entities/AccessLevel";
import {AverageBarChart} from "./components/AverageBarChart";
import {GrouppedGlosses} from "./components/GrouppedGlosses";
import {RepairDetailsPieChart} from "./components/RepairDetailsPieChart";

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
          isFetchingRigsAverage,
          rigsAverage,
          rigs,
          isEmpty,
          totalAvailableHours,
          availableHoursPercentage,
          totalUnavailableHours,
          unavailableHoursPercentage,
          totalDtms,
          totalMovimentations,
          efficiencies,
          windowWidth,
          user,
          months,
          filterOptions,
          glossPeriods,
          handleToggleFilterType,
          selectedFilterType,
          selectedPeriod,
          selectedYear,
          repairPeriods,
          handleYearChange,
          years,
          selectedEquipment,
        }) => (
          <div className="w-full  pt-10 overflow-y-scroll">
            <div className="w-full flex flex-wrap justify-center items-center lg:justify-end gap-1 lg:px-4">
              <div className="w-[113px] lg:w-[250px]">
                <Select
                  error={""}
                  placeholder="Tipo de Filtro"
                  value={selectedFilterType}
                  onChange={(value) =>
                    handleToggleFilterType(value as FilterType)
                  }
                  options={filterOptions}
                />
              </div>
              <div className="w-[113px] lg:w-[123px]">
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
              </div>
              {selectedFilterType === FilterType.PERIOD && (
                <>
                  <div className="w-[113px] lg:w-[123px]">
                    <Select
                      error={""}
                      placeholder="Período"
                      value={selectedPeriod}
                      onChange={(value) => handleChangePeriod(value)}
                      options={months}
                    />
                  </div>

                  <div className="w-[113px] lg:w-[123px]">
                    <Select
                      error={""}
                      placeholder="Ano"
                      value={selectedYear}
                      onChange={(value) => handleYearChange(value)}
                      options={years}
                    />
                  </div>
                </>
              )}

              {selectedFilterType === FilterType.CUSTOM && (
                <>
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
                </>
              )}

              <div>
                <Button
                  className="h-[32px] lg:h-[52px]"
                  onClick={handleApplyFilters}
                >
                  {windowWidth <= 1024 ? <FilterIcon /> : "Aplicar Filtro"}
                </Button>
              </div>
            </div>
            <div className=" w-full flex justify-center my-6">
              <div className="stats  bg-gray-500">
                {!isFetchingEfficiencies && !isEmpty && (
                  <>
                    <div className="stat">
                      <div className="stat-figure text-white">
                        <div
                          className="radial-progress text-primary"
                          style={{"--value": availableHoursPercentage} as any}
                        >
                          {availableHoursPercentage || 0}%
                        </div>
                      </div>
                      <div className="stat-title  text-primary">
                        Horas Disp.
                      </div>
                      <div className="stat-value  text-primary">
                        {totalAvailableHours.toFixed()}Hrs
                      </div>
                      <div className="stat-desc  text-primary">
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
                      <div className="stat-figure text-primary">
                        <div className="w-16 rounded-full">
                          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white">
                            <Truck size={50} />
                          </div>
                        </div>
                      </div>
                      <div className="stat-value text-primary">{totalDtms}</div>
                      <div className="stat-title text-primary">DTMs</div>
                      <div className="stat-desc text-primary">
                        No período selecionado
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-figure text-primary">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white">
                          <BaggageClaim size={50} />
                        </div>
                      </div>
                      <div className="stat-value text-primary">
                        {totalMovimentations}
                      </div>
                      <div className="stat-title text-primary">
                        Movimentações
                      </div>
                      <div className="stat-desc text-primary">
                        No período selecionado
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className=" mx-auto max-w-[1024px] bg-gray-400 min-h-[450px] rounded-md lg:min-w-[1300px] lg:p-4 flex justify-center items-center">
              {isEmpty && (
                <>
                  {isFetchingEfficiencies && (
                    <div className="w-full h-full flex justify-center items-center">
                      <Spinner />
                    </div>
                  )}

                  {!isFetchingEfficiencies && (
                    <div className="w-full h-full flex justify-center items-center">
                      <NotFound>
                        <strong>Não</strong> existem dados para a{" "}
                        <strong>sonda</strong> no <strong>período</strong>{" "}
                        selecionado!
                      </NotFound>
                    </div>
                  )}
                </>
              )}

              {!isEmpty && (
                <div className=" flex-1 grid grid-cols-12 auto-rows-[120px] gap-3">
                  <div
                    className={cn(
                      "col-span-12 row-span-3 flex justify-center bg-gray-200 rounded-lg items-center  lg:row-span-3 lg:col-start-0 lg:col-span-12"
                    )}
                  >
                    {isFetchingEfficiencies && <Spinner />}
                    {!isFetchingEfficiencies && <LineChart />}
                  </div>

                  {/*    <div className="col-span-6 row-span-2 flex justify-center bg-gray-200 rounded-lg items-center">
                    {isFetchingEfficiencies && <Spinner />}
                    {!isFetchingEfficiencies && <LineChart />}
                  </div>*/}

                  <div
                    className={`col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6  `}
                  >
                    {isFetchingEfficiencies && <Spinner />}
                    {repairPeriods.length === 0 && !isFetchingEfficiencies && (
                      <div className="flex justify-center  items-center">
                        <NotFound>
                          <strong>Não</strong> existem dados de{" "}
                          <strong>reparos</strong> para a <strong>sonda</strong>{" "}
                          no <strong>período</strong> selecionado!
                        </NotFound>
                      </div>
                    )}
                    {!isFetchingEfficiencies && repairPeriods.length > 0 && (
                      <div className="w-full h-full">
                        <GrouppedRepairs />
                      </div>
                    )}
                  </div>

                  {selectedEquipment && (
                    <div className="col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6 lg:row-span-3">
                      {isFetchingEfficiencies && <Spinner />}
                      {repairPeriods.length === 0 &&
                        !isFetchingEfficiencies && (
                          <div className="flex justify-center items-center">
                            <NotFound>
                              <strong>Não</strong> existem dados para a{" "}
                              <strong>sonda</strong> no <strong>período</strong>{" "}
                              selecionado!
                            </NotFound>
                          </div>
                        )}
                      {!isFetchingEfficiencies && repairPeriods.length > 0 && (
                        <div className="w-full h-full">
                          <RepairDetailsPieChart />
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    className={`col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6  `}
                  >
                    {isFetchingEfficiencies && <Spinner />}
                    {glossPeriods.length === 0 && !isFetchingEfficiencies && (
                      <div className="flex justify-center  items-center">
                        <NotFound>
                          <strong>Não</strong> existem dados de{" "}
                          <strong>glosa</strong> para a <strong>sonda</strong>{" "}
                          no <strong>período</strong> selecionado!
                        </NotFound>
                      </div>
                    )}
                    {!isFetchingEfficiencies && glossPeriods.length > 0 && (
                      <div className="w-full h-full">
                        <GrouppedGlosses />
                      </div>
                    )}
                  </div>

                  {user?.accessLevel === AccessLevel.ADM && (
                    <div className="col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6 lg:row-span-3">
                      {isFetchingRigsAverage && <Spinner />}
                      {rigsAverage.length === 0 && !isFetchingRigsAverage && (
                        <div className="flex justify-center items-center">
                          <NotFound>
                            <strong>Não</strong> existem dados para a{" "}
                            <strong>sonda</strong> no <strong>período</strong>{" "}
                            selecionado!
                          </NotFound>
                        </div>
                      )}
                      {!isFetchingRigsAverage && rigsAverage.length > 0 && (
                        <div className="w-full h-full">
                          <AverageBarChart />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="col-span-12 row-span-3 flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-6">
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
            {/*       <Modal
              title="Novidades e Melhorias Recentes!!"
              maxWidth="1000px"
              open={!isAlertSeen}
              onClose={handleIsAlertSeen}
            >
              <div className="text-gray-600 flex items-center">
                <div className=" flex-1 flex items-center justify-center">
                  <AddFiles className="h-60 w-60" />
                </div>
                <div className=" flex-1">
                  <span className="block text-gray-800 font-semibold">
                    Olá {user?.name},
                  </span>

                  <span className="text-gray-800 font-semibold">
                    Confira as últimas{" "}
                    <span className="text-primary">atualizações</span> e
                    melhorias que fizemos no sistema para aprimorar ainda mais
                    sua <span className="text-primary">experiência</span>.
                    Confira as novidades:
                  </span>
                  <ul className="list-disc list-inside">
                    <li className="my-4">Novidades no Dashboard!</li>
                    <span>
                      Adicionado novo um gráfico ao Dashboard 📊, exibindo a
                      quantidade de reparos realizados em equipamentos durante o
                      período selecionado!
                    </span>
                    <li className="my-4">Nova Página de Relatórios!</li>
                    <span>
                      Apresentamos uma nova página de relatórios que facilitará
                      sua análise de dados. Agora, é possível organizar períodos
                      com base em tipo e classificação, proporcionando uma
                      visualização mais detalhada e personalizada das
                      informações.
                    </span>
                  </ul>
                </div>
              </div>
            </Modal> */}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
};
